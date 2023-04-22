import { useEffect, useState, useRef } from 'react'

const Prueba = () => {
  const videoRef = useRef(null)
  const videoRecorderRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const recordingInterval = useRef(null)

  const [msgError, setMsgError] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordBlob, setRecordBlob] = useState([])
  const [isRecordingStopped, setIsRecordingStopped] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)

  const constraints = {
    audio: false,
    video: true
  }

  const handleSuccess = (stream) => {
    const video = videoRef.current
    const videoTracks = stream.getVideoTracks()
    window.stream = stream
    video.srcObject = stream

    getSupportedMimeTypes().forEach((mimeType) => {
      console.log(mimeType)
    })

    console.log('Using video device: ' + videoTracks[0].label)
  }

  const handleError = (error) => {
    if (error.name === 'ConstraintNotSatisfiedError') {
      const v = constraints.video
      setMsgError(
        `The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`
      )
    } else if (error.name === 'PermissionDeniedError') {
      setMsgError(
        'Permissions have not been granted to use your camera and ' +
          'microphone, you need to allow the page access to your devices in ' +
          'order for the demo to work.'
      )
    }
    setMsgError(`getUserMedia error: ${error.name}`)
  }

  const initial = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      handleSuccess(stream)
    } catch (e) {
      handleError(e)
    }
  }

  const handleDataAvailable = (event) => {
    console.log('handleDataAvailable', event)
    if (event.data && event.data.size > 0) {
      setRecordBlob([...recordBlob, event.data])
    } else {
      console.log('No data available in event')
    }
  }

  useEffect(() => {
    initial()
  }, [])

  const grabar = () => {
    const startTime = Date.now()
    recordingInterval.current = setInterval(() => {
      setRecordingTime(Date.now() - startTime)
    }, 1000)

    setRecordBlob([])

    try {
      mediaRecorderRef.current = new MediaRecorder(window.stream)
    } catch {
      setMsgError('No se pudo grabar')
    }

    setIsRecording(true)
    mediaRecorderRef.current.onstop = (event) => {
      console.log('Recorder stopped: ', event)
      console.log('Recorded Blobs: ', recordBlob)
    }
    mediaRecorderRef.current.ondataavailable = handleDataAvailable
    mediaRecorderRef.current.start()
  }

  const stop = () => {
    mediaRecorderRef.current.stop()
    const tracks = window.stream.getTracks()
    clearInterval(recordingInterval.current)

    tracks.forEach((track) => {
      track.stop()
    })

    setIsRecordingStopped(true)
  }

  const play = async () => {
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

  const getSupportedMimeTypes = () => {
    const possibleTypes = [
      'video/webm;codecs=av1,opus',
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm;codecs=h264,opus',
      'video/mp4;codecs=h264,aac'
    ]
    return possibleTypes.filter((mimeType) => {
      return MediaRecorder.isTypeSupported(mimeType)
    })
  }

  return (
    <div style={{ width: '100px', height: '100px' }}>
      {isRecordingStopped ? (
        <video playsInline loop ref={videoRecorderRef} />
      ) : (
        <video
          style={{ width: '400px', height: '400px' }}
          autoPlay
          playsInline
          ref={videoRef}
        />
      )}
      {isRecording ? (
        <>
          <button onClick={stop}>Detener</button>
          <p>Grabando por {(recordingTime / 1000).toFixed(0)} segundos</p>
        </>
      ) : (
        <>
          <button onClick={grabar}>Grabar</button>
        </>
      )}

      <button onClick={play}>Reproducir</button>

      <p>{msgError}</p>
    </div>
  )
}

export default Prueba
