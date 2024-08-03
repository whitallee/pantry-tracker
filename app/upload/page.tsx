'use client'

import Image from "next/image"
import { useState, useRef } from "react"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "@/firebase"
import { Container, Typography } from "@mui/material"
import Link from "next/link"
import { CameraAlt, Collections, Home } from "@mui/icons-material"

import { Camera } from "react-camera-pro"

export default function Upload() {

    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [uploadedUrl, setUploadedUrl]: any = useState(null)

    const camera = useRef(null)
    const [photo, setPhoto] = useState(null)

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0])
    }

    const handleUpload = async () => {
        if (!file) return

        setUploading(true)
        // @ts-ignore
        const filePath = 'images/' + file.name
        const storageRef = ref(storage, filePath)

        try {
            await uploadBytes(storageRef, file)
            const url = await getDownloadURL(storageRef)
            setUploadedUrl(url)
            console.log("File loaded successfully")
        } catch (error) {
            console.error("Error uploading the file", error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <Container className="flex flex-col gap-2 justify-center items-center">
            <Typography className="text-4xl sm:text-8xl py-2" variant="h1" align="center">Pantry Tracker</Typography>
            <input className="border-2 border-solid border-white p-2 rounded-md" type="file" onChange={handleFileChange}></input>
            <div className="flex gap-2">
                <button className="border-2 border-solid border-white p-2 rounded-md" onClick={handleUpload} disabled={uploading}>
                    {uploading ? "Uploading..." : "Upload Image"}
                </button>
                <button className="border-2 border-solid border-white p-2 rounded-md">
                    Take a Picture
                </button>
                
            </div>
            <div>
                {/* @ts-ignore */}
                <Camera ref={camera} aspectRatio={1/1}/>
                {/* @ts-ignore */}
                <button onClick={() => setPhoto(camera.current.takePhoto())}>Take photo</button>
                {/* @ts-ignore */}
                <img src={photo} alt='Taken photo' onChange={handleFileChange}/>
            </div>
            { uploadedUrl && (
                <div>
                    <p>Uploaded Image:</p>
                    <Image className="w-80 h-80 object-cover" src={uploadedUrl} alt="Uploaded Image" width={300} height={300}/>
                </div>
            )}
        </Container>
    )
}
