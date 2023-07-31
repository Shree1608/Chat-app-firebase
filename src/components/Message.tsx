import { Avatar, Flex, HStack , Text ,} from '@chakra-ui/react'
import React from 'react'
import '../style/Message.css'

const Message = ({text , uri , user ='other'}:{text:string , uri:string ,user?:string }) => {

  return (
    <div>
      {
        user === 'me' ? (

          <Flex display={'column'} alignSelf='flex-end'>

          <HStack 
          w={'100%'}
          marginTop={'2'}
          borderRadius={'base'} 
          bg={'gray.100'}
          paddingY={'2'} 
          paddingX={'4'}
          >
           <Text w={'40'}>
               {text}
           </Text>
           <Avatar src={uri}/>
         </HStack>
          </Flex>
        ):(
          <HStack 
          marginTop={'2'} alignSelf ='flex-start'
          borderRadius={'base'} 
          bg={'gray.100'}
          paddingY={'2'} 
          paddingX={'4'}
          >
           <Avatar  src={uri}/>
           <Text w={'40'}>
               {text}
           </Text>
         </HStack>
        )
      }
      
      
    
    </div>
  )
}

export default Message
