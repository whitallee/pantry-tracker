'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase"
import { Box, Typography } from "@mui/material";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";

export default function Home() {

  const [inventory, setInventory]: [any[], any] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState(false)

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "whit's pantry"))
    const docs = await getDocs(snapshot)
    const inventoryList: any[] = []
    docs.forEach(doc => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
  }

  const removeItem = async (item: string) => {
    const docRef = doc(collection(firestore, "whit's pantry"), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      if(quantity === 1){
        deleteDoc(docRef)
      } else {
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }
    await updateInventory()
  }

  const addItem = async (item: string) => {
    const docRef = doc(collection(firestore, "whit's pantry"), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
    } else {
      await setDoc(docRef, {quantity: 1})
    }
    await updateInventory()
  }

  useEffect(() => {
      updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center" gap={2}>
      <Typography variant="h1">Pantry Tracker</Typography>
    </Box>
  );
}
