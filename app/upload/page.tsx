'use client'

import Image from "next/image"
import { useState, useRef } from "react"
import { ref, uploadBytes, getDownloadURL, uploadString } from "firebase/storage"
import { storage } from "@/firebase"
import { Container, Typography } from "@mui/material"
import Link from "next/link"
import { CameraAlt, Cameraswitch, Collections, Home } from "@mui/icons-material"

import { Camera } from "react-camera-pro"

export default function Upload() {

    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [uploadedUrl, setUploadedUrl]: any = useState(null)

    const camera = useRef(null)
    const [numberOfCameras, setNumberOfCameras] = useState(0);
    const [photo, setPhoto]: any = useState(null)
    const [photoUploading, setPhotoUploading] = useState(false)
    const [photoUploadedUrl, setPhotoUploadedUrl]: any = useState(null)

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0])
    }

    const handlePhotoTaken = async (photoTaken: any) => {
        // console.log("handlePhotoTaken")
        // await setFile(photoTaken)
        // console.log("photo: " + photo)
        // console.log("file: " + file)
    }

    const handleUpload = async () => {
        if (!file) {
            console.log("No file")
            return
        }

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

    const handlePhotoUpload = async () => {
        if (!photo) {
            console.log("No photo")
            return
        }

        setPhotoUploading(true)
        console.log(Date())
        // @ts-ignore
        const filePath = 'images/taken ' + Date() + '.jpeg'
        const storageRef = ref(storage, filePath)

        try {
            await uploadString(storageRef, photo.split(',')[1], 'base64', {contentType: "image/jpeg"}) //CHECK THIS
            const url = await getDownloadURL(storageRef)
            setPhotoUploadedUrl(url)
            console.log("Photo loaded successfully")
        } catch (error) {
            console.error("Error uploading the photo", error)
        } finally {
            setPhotoUploading(false)
        }
    }

    return (
        <Container className="flex flex-col md:flex-row gap-6 justify-center items-center min-h-[calc(100vh-57px)] w-screen pb-4 bg-gradient-to-b to-gray-950 from-black">

            {/* Upload files */}
            <div className="flex flex-col gap-2 justify-start items-center">
                <input className="border-2 border-solid border-white p-2 rounded-md w-full" type="file" onChange={handleFileChange}></input>
                <div className="flex gap-2">
                    <button className="border-2 border-solid border-white p-2 rounded-md" onClick={handleUpload} disabled={uploading}>
                        {uploading ? "Uploading..." : "Upload Image File"}
                    </button>
                </div>
                { uploadedUrl && (
                    <div>
                        <p className="pb-2 pt-6">Uploaded Image:</p>
                        <Image className="w-[300px] h-[300px] object-cover aspect-square rounded-xl" src={uploadedUrl} alt="Uploaded Image" width={300} height={300}/>
                    </div>
                )}
            </div>

            {/* Take a picture */}
            <div className="flex flex-col gap-2">
                <div className="rounded-xl overflow-hidden bg-gray-800 z-10000">
                    {/* @ts-ignore */}
                    <Camera ref={camera} aspectRatio={1/1} numberOfCamerasCallback={setNumberOfCameras}/>
                    {/* <Image className="absolute z-10010 scale-[175%]" src={"/cameraFrame.png"} alt="camera frame" width={300} height={300}/> */}
                </div>
                <div className="flex gap-2 w-full">
                    <button className="flex-1 border-2 border-solid border-white p-2 rounded-md" onClick={() => {
                        {/* @ts-ignore */}
                        setPhoto(camera.current.takePhoto())
                    }}>Capture Photo</button>
                    <button className="border-2 border-solid border-white p-2 rounded-md" onClick={() => {
                        {/* @ts-ignore */}
                        camera.current.switchCamera();
                    }}><Cameraswitch/></button>
                </div>
                <div className="w-[300px] flex justify-between">
                    {/* @ts-ignore */}
                    <div>
                        <p className="pb-2 pt-6">Taken Photo:</p>
                        <img src={photo} alt='Taken photo' className="w-[146px] h-[146px] bg-gradient-to-br from-gray-800 to-black rounded-xl"/>
                        </div>
                    { photoUploadedUrl && (
                    <div>
                        <p className="pb-2 pt-6">Uploaded Photo:</p>
                        <Image className="w-[146px] h-[146px] object-cover aspect-square rounded-xl" src={photoUploadedUrl} alt="Uploaded Image" width={300} height={300}/>
                    </div>
                )}
                </div>
                <button className="border-2 border-solid border-white p-2 rounded-md w-fit mx-auto" onClick={handlePhotoUpload} disabled={photoUploading && !photo}>
                    {!photo ? "No photo taken " : uploading ? "Uploading..." : "Upload Photo"}
                </button>
                <button className="border-2 border-solid border-white p-2 rounded-md w-fit mx-auto" onClick={() => console.log(photo)}>
                    Console Log Photo
                </button>
            </div>     

        </Container>
    )
}
