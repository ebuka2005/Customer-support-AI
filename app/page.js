'use client'

import { Box, Button, Stack, TextField, ThemeProvider, createTheme} from '@mui/material'
import { useState, useRef, useEffect } from 'react'

const theme = createTheme({
  palette: {
    primary: {
      main: '#3a7bd5', // A modern blue
    },
    secondary: {
      main: '#00d2ff', // A bright cyan
    },
    background: {
      default: '#f0f2f5', // Light grey background
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
  },
});

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the Customer support assistant. How can I help you today?",
    },
  ])
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true)

  
    setMessage('')
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: ''},
    ])
  
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      })
  
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
  
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
  
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const text = decoder.decode(value, { stream: true })

        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ]
        })
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
      ])
    }
    setIsLoading(false)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <ThemeProvider theme={theme}>
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="background.default"
    
    >
      <Stack
        direction={'column'}
        width="90%"
        maxWidth="900px"
        height="90vh"
        bgcolor="white"
        borderRadius={4}
        boxShadow={3}
        p={3}
        spacing={3}
      >
        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
          sx={{
            '&::-webkit-scrollbar': {
              width: '0.4em',
            },
            '&::-webkit-scrollbar-track': {
              boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
              webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,.1)',
              borderRadius: '10px',
            },
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor={
                  message.role === 'assistant'
                    ? 'primary.main'
                    : 'secondary.main'
                }
                color="white"
                borderRadius={2}
                p={2}
                maxWidth="70%"
                sx={{
                  fontSize: '1rem',
                  boxShadow: 1,
                }}
              >
                {message.content}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
          <Button 
            variant="contained" 
            onClick={sendMessage}
            disabled={isLoading}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  </ThemeProvider>
)
}