import { useState, useRef } from 'react'
import { constraints } from '../data/constraints'

export const useRecorder = (quiz) => {
  const [recordBlob, setRecordBlob] = useState([])
  const mediaRecorderRef = useRef(null)

  const initial = async (videoRef, setIsLoading) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      setIsLoading(false)
      const video = videoRef.current
      window.stream = stream
      video.srcObject = stream
    } catch (e) {
      console.log(e)
    }
  }

  const handleDataAvailable = (event) => {
    if (event.data && event.data.size > 0) {
      setRecordBlob([...recordBlob, event.data])
    } else {
      console.log('No data available in event')
    }
  }

  const startRecording = () => {
    setRecordBlob([])

    try {
      mediaRecorderRef.current = new MediaRecorder(window.stream)
    } catch {
      console.log('No se pudo grabar')
    }

    mediaRecorderRef.current.ondataavailable = handleDataAvailable
    mediaRecorderRef.current.start()
  }

  const stopRecording = () => {
    mediaRecorderRef.current.stop()
    const tracks = window.stream.getTracks()

    tracks.forEach((track) => {
      track.stop()
    })

    quiz.completed = true
  }

  const startPlay = (videoRecorderRef, isRecordingStopped) => {
    if (recordBlob.length === 0) {
      console.log('No recorded data available')
      return
    }

    if (!isRecordingStopped) return
    const superBuffer = new Blob(recordBlob, {
      type: 'video/webm;codecs=vp9'
    })
    videoRecorderRef.current.src = null
    videoRecorderRef.current.srcObject = null
    videoRecorderRef.current.src = window.URL.createObjectURL(superBuffer)
    videoRecorderRef.current.controls = true
    videoRecorderRef.current.play()
  }

  const resetRecording = (setIsRecorded, videoRef, setIsLoading) => {
    setRecordBlob([])
    setIsRecorded(false)
    initial(videoRef, setIsLoading)
    quiz.completed = false
  }

  return {
    startRecording,
    stopRecording,
    startPlay,
    resetRecording,
    initial
  }
}
