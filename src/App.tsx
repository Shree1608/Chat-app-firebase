import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Box, Button, Container,  Flex,  HStack, Input, VStack } from '@chakra-ui/react';
import Message from './components/Message'
import { GoogleAuthProvider, getAuth,  onAuthStateChanged,  signInWithPopup, signOut, } from 'firebase/auth'
import {addDoc, collection, getFirestore, onSnapshot, orderBy, query, serverTimestamp} from 'firebase/firestore'
import  app  from './firebase';

const auth = getAuth(app)
const db = getFirestore(app)

interface MessageProps {
  id:string
  uid: string;
  text: string;
  photoURL: string;
}



interface User {
  uid : string,
  photoURL :string
}

function App() {
  const showbyOrder = query(collection(db , "Messages"),orderBy('createdAt' ,'asc'))
  const [user ,setUser] = useState<User | null>(null);
  const [message , setMessage] = useState('');
  const[allMessages , setAllMessages] = useState<Array<MessageProps & {id : string}>>([]);
  const divForScroll = useRef<HTMLDivElement | null>(null)
  
  const handleLogin  = () =>{
       const provider = new GoogleAuthProvider() 
       provider.setCustomParameters({
        prompt :'select_account'
       })
      //  const emailProvider = new EmailAuthProvider()
       signInWithPopup(auth , provider )
  }

  const handLogout = () =>{
    signOut(auth)
  }

  const submiteHandler = async (e:any) =>{
    e.preventDefault();
    setMessage(" ")
    try {
       await addDoc(collection(db , "Messages") ,{
        text:message,
        uid: user?.uid,
        photoURL: user?.photoURL,
        createdAt : serverTimestamp()
      })
      divForScroll.current?.scrollIntoView({ behavior: 'smooth' });    } catch (error) {
      console.log(error);
      
      alert("Error sending message: " + error)
    }
  }
  useEffect(() => {
    AuthCheck(setUser);
    fetchMessage()
    return() => {
      AuthCheck(setUser);
      fetchMessage();
    }

  },[])

  
  

  const fetchMessage = onSnapshot(showbyOrder,(snap)=>{
    setAllMessages(snap.docs.map((item) => {
      const id = item.id
      return { id , ...item.data()} as MessageProps & { id: string };
    }));
    console.log
    (snap.docs.map((item) => {
      const id = item.id
      return { id , ...item.data()} as MessageProps & { id: string };
    }))
    
  })
  const AuthCheck = (setUser :any) =>{  
    onAuthStateChanged(auth , (data)=>{
            if(data !== null){
              setUser({
                uid : data.uid,
                photoURL : data.photoURL
              })
            }
            else{
              setUser(false)
            }      
    })
  } 
  return (
    <Box>
      {
        user ? (
      <Container h={'100vh'} bg={'pink.200'}>
        <VStack  h='full' paddingX={'4'}>
            <Button onClick={handLogout} colorScheme='red' w={'full'}>Logout</Button>

            <VStack h='full'width={'100%'} backgroundColor={'black'} overflow={'auto'}>
              <Flex display={'column'} alignSelf={'flex-end'} marginTop={'2'} marginBottom={'2'} padding={'2'}>
                {
                  allMessages.map(( items)=>(
                    <Message 
                    key={items.id}
                    user= {items.uid === user.uid ? "me" : "other"}
                    text={items.text}
                    uri={items.photoURL} />
                    ))
                  }
                  <div ref={divForScroll}  ></div>
              </Flex>
            </VStack>

          <form onSubmit={submiteHandler} action="" style={{width:'100%'}}>
          <HStack w={'100%'} >
            <Input 
            required
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            placeholder={'Enter message ...'} bg={'white'}/>
            <Button type='button' onClick={submiteHandler} colorScheme='blue'>Send</Button>
          </HStack>
          </form>
        </VStack>
      </Container>

        ):(
          <Container>
          <HStack paddingTop={'4'} >
            <Button onClick={handleLogin}>SignIn with Google</Button>
            {/* <Button>SignIn with Email</Button> */}
          </HStack>
          </Container>
        )
      }
    </Box>
  );
}

export default App;
