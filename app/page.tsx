'use client'


import { useState, useEffect } from "react";
import { firestore } from "@/firebase"
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";

export default function Home() {

  const [inventory, setInventory]: [any[], any] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState("")

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
    <Box width="100vw" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2}>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{transform: "translate(-50%, -50%)"}} position="absolute" top="50%" left="50%" width={400} bgcolor="white" border="2px solid #000000" boxShadow={24} p={4} display="flex" flexDirection="column" gap={3}>
          <Typography variant="h6" color="black">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField variant="outlined" fullWidth value={itemName} onChange={(e) => {setItemName(e.target.value)}}/>
            <Button variant="outlined" onClick={() => {
              addItem(itemName)
              setItemName('')
              handleClose()
            }}>Add</Button>
          </Stack>
        </Box>
      </Modal>
      <Typography variant="h1">Pantry Tracker</Typography>
      <Button variant="contained" onClick={() => {
        handleOpen()
      }}>Add new item</Button>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" border="2px solid #333" borderRadius={4} padding={4}>
        <Typography variant="h2">Inventory List</Typography>
      </Box>
    </Box>
  );
}
