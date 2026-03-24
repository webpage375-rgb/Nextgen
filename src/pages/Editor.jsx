import React, { useState, useRef } from 'react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

const ffmpeg = createFFmpeg({ log: true })

export default function Editor() {
  const [file, setFile] = useState(null)
  const [ready, setReady] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [outputUrl, setOutputUrl] = useState(null)
  const [start, setStart] = useState('0')
  const [end, setEnd] = useState('5')
  const videoRef = useRef()

  async function loadFFmpeg() {
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load()
    }
    setReady(true)
  }

  async function onFileChange(e) {
    const f = e.target.files?.[0]
    if (f) {
      setFile(f)
      setOutputUrl(null)
      if (!ready) await loadFFmpeg()
    }
  }

  async function handleTrim() {
    if (!file) return
    setProcessing(true)
    try {
      ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(file))
      // run ffmpeg to trim using -ss (start) and -to (end)
      await ffmpeg.run('-i', 'input.mp4', '-ss', `${start}`, '-to', `${end}`, '-c', 'copy', 'output.mp4')
      const data = ffmpeg.FS('readFile', 'output.mp4')
      const blob = new Blob([data.buffer], { type: 'video/mp4' })
      const url = URL.createObjectURL(blob)
      setOutputUrl(url)
    } catch (err) {
      console.error(err)
      alert('Processing failed. See console for details.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Editor</h2>

      <div className="p-4 bg-white rounded shadow space-y-4">
        <div>
          <label className="block text-sm font-medium">Upload MP4</label>
          <input type="file" accept="video/*" onChange={onFileChange} className="mt-2" />
        </div>

        <div className="flex gap-3 items-center">
          <label className="text-sm">Start (seconds)</label>
          <input type="number" value={start} onChange={(e) => setStart(e.target.value)} className="border px-2 py-1 rounded w-24" />
          <label className="text-sm">End (seconds)</label>
          <input type="number" value={end} onChange={(e) => setEnd(e.target.value)} className="border px-2 py-1 rounded w-24" />
          <button onClick={handleTrim} disabled={!ready || processing || !file} className="ml-4 bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50">{processing ? 'Processing...' : 'Trim'}</button>
        </div>

        <div>
          <button onClick={loadFFmpeg} disabled={ready} className="bg-blue-600 text-white px-3 py-2 rounded disabled:opacity-50">{ready ? 'FFmpeg Ready' : 'Load FFmpeg'}</button>
        </div>

        <div>
          {file && (
            <video ref={videoRef} controls className="w-full mt-4" src={URL.createObjectURL(file)} />
          )}
        </div>

        <div>
          {outputUrl && (
            <>
              <h3 className="font-medium">Result</h3>
              <video controls className="w-full mt-2" src={outputUrl} />
              <a className="inline-block mt-2 text-blue-600" href={outputUrl} download="trimmed.mp4">Download trimmed.mp4</a>
            </>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-500">Note: ffmpeg.wasm runs in the browser and may be slower on low-end devices. For production, consider server-side processing or WebWorker optimizations.</p>
    </div>
  )
}