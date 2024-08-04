'use client'

import Link from "next/link";
import { useState, useEffect, } from "react";
import { firestore } from "@/firebase"
import { Box, Button, Container, Modal, Stack, TextField, Typography } from "@mui/material";
import { Delete, Add, CameraAlt, Collections } from "@mui/icons-material";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";

export default function Home() {

  const [inventory, setInventory]: [any[], any] = useState([])
  const [searchInventory, setSearchInventory]: [any[], any] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState("")
  const [searchBarQuery, setSearchBarQuery] = useState("")

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
    setSearchInventory(inventoryList)
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
    const docRef = doc(collection(firestore, "whit's pantry"), item.toLowerCase())
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
    <Container>

      {/* Modal for adding an item */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{transform: "translate(-50%, -50%)"}} position="absolute" top="50%" left="50%" width={400} bgcolor="white" border="2px solid #000000" boxShadow={24} p={4} display="flex" flexDirection="column" gap={3} borderRadius={3}>
          <Typography variant="h6" color="black" width="100%" textAlign="center">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField placeholder="Item name" variant="outlined" fullWidth value={itemName} onChange={(e) => {setItemName(e.target.value)}}/>
            <Button variant="outlined" onClick={() => {
              addItem(itemName)
              setItemName('')
              handleClose()
            }}>Add</Button>
          </Stack>
        </Box>
      </Modal>


      <div className="flex w-full items-center justify-center p-2">
        <Button variant="contained" onClick={() => {
          handleOpen()
        }}>Add new item</Button>
      </div>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" border="2px solid #333" borderRadius={4} padding={1} gap={2}>
        <Stack className="flex flex-col sm:flex-row mt-2" maxWidth="730px" direction="row" overflow="auto" gap={1}>
          <TextField className="bg-white rounded-[4px]" variant="outlined" fullWidth placeholder="Search pantry" value={searchBarQuery} onChange={(e) => {
              setSearchBarQuery(e.target.value)
              if (searchBarQuery.length > 0){
                setSearchInventory(inventory.filter((item) => {
                  return item.name.match(searchBarQuery.toLowerCase())
                }))
              } else if (searchBarQuery.length === 0) {
                setSearchInventory(inventory)
              }
            }}/>
          <Button className="text-nowrap rounded-[4px] w-full" variant="contained" onClick={() => {
              setSearchBarQuery("")
              setSearchInventory(inventory)
            }}>Clear Search</Button>
        </Stack>
        <Stack width="100%" height="400px" spacing={2} overflow="auto" border="2px solid #333" borderRadius={4} padding={1}>
          {
            searchInventory.map(({name, quantity}) => (
              <Box className="flex flex-col sm:flex-row gap-2" key={name} width="100%" alignItems="center" justifyContent="space-between" bgcolor="#f0f0f0" padding={2} borderRadius={4}>
                <Typography className="text-3xl sm:text-5xl" variant="h3" color="#333" textAlign="center">{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
                <Stack direction="row" gap={2}>
                  <Typography className="text-3xl sm:text-5xl" variant="h3" color="#333" textAlign="center">{quantity}</Typography>
                  <Button variant="contained" onClick={() => {addItem(name)}}><Add/></Button>
                  <Button variant="contained" onClick={() => {removeItem(name)}}><Delete/></Button>
                </Stack>
              </Box>
            ))
          }
        </Stack>
      </Box>
    </Container>
  );
}
