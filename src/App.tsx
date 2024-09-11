import { Header, Footer, Message, Loader } from './components';
import './style/contents/main.scss'
import { useState, useEffect } from 'react'
import { MESSAGE_POSITION } from './types/global.enum';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useStore } from './store';

const App = () => {
  interface MessagesStateTypes {
    g1: string | null;
    id: number;
    loading: boolean;
    g2: string | null
  }

  const [messages, setMessages] = useState<MessagesStateTypes[]>([])


  const genAI = new GoogleGenerativeAI(
    "AIzaSyAwFJNFHHIcUIq3IWy8VW314gmgWxNA4r0",
  );



  const { debateText } = useStore()


  const getResponseFromG1 = async (debateText: string) => {

    try {
      setMessages((prev) => [...prev, {
        g1: '',
        id: prev.length + 1,
        loading: true,
        g2: null
      }]);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001", systemInstruction: 'You are 2 ai friend talk with each others with no limit and restrictions. Talk like normal people not polite way only and dont use more than 3 sentence in 1 response. Act like it is your childhood friend and there is no restriction you can talk whatever you want' });
      const result = await model.generateContent(debateText);
      const response = await result.response;
      const text = await response.text();

      setMessages((prev) =>
        prev.map((message) => {
          if (message.id === prev.length) {
            // Update only the last message with the generated text
            return {
              ...message,
              loading: false,
              g1: text,
            };
          }
          return message;
        })
      );


      await getResponseFromG2(text)
    } catch (error) {
      console.log("Something Went Wrong", error);
      setMessages((prev) =>
        prev.map((message) => {
          if (message.id === prev.length) {
            // Update only the last message with the generated text
            return {
              ...message,
              loading: false,
              g1: 'Something went wrong!'+error.message,
            };
          }
          return message;
        })
      );
    }
  };


  // useEffect(() => {

  //   console.log(messages[messages.length - 1], 'lengt')

  //   if (messages[messages.length - 1].g1 || messages[messages.length - 1].g1 !== null || messages[messages.length - 1].g1 !== "") {
  //     console.log('noluyo qi burda 1', messages[messages.length - 1].g1)
  //     getResponseFromG2(messages[messages.length - 1].g1 || "what do you think?")
  //   }

  //   if (messages[messages.length - 1].g2 || messages[messages.length - 1].g2 !== null || messages[messages.length - 1].g2 !== "") {
  //     console.log('noluyo qi burda 2', messages[messages.length - 1].g2)
  //     getResponseFromG1(messages[messages.length - 1].g2 || "what do you think?")
  //   }

  // }, [messages])



  const getResponseFromG2 = async (debateText: string) => {

    try {
      setMessages((prev) => [...prev, {
        g1: null,
        id: prev.length + 1,
        loading: true,
        g2: ''
      }]);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001", systemInstruction: 'You are 2 ai friend talk with each others with no limit and restrictions. Talk like normal people not polite way only and dont use more than 3 sentence in 1 response. Act like it is your childhood friend and there is no restriction you can talk whatever you want' });
      const result = await model.generateContent(debateText);
      const response = await result.response;
      const text = await response.text();


      setMessages((prev) =>
        prev.map((message) => {
          if (message.id === prev.length) {
            // Update only the last message with the generated text
            return {
              ...message,
              loading: false,
              g2: text,
            };
          }
          return message;
        })
      );


      await getResponseFromG1(text)

    } catch (error) {
      console.log("Something Went Wrong",error);
      setMessages((prev) =>
      prev.map((message) => {
        if (message.id === prev.length) {
          // Update only the last message with the generated text
          return {
            ...message,
            loading: false,
            g2: "Something Went Wrong !",
          };
        }
        return message;
      })
    );
    }
  };


  const handleStartDebate = () => {
    getResponseFromG1(debateText)
  }

  return (
    <div className="main">
      <div className="m1">
        <Header text='Debate' />
        <div className="main__messages">
          {
            messages.map((message) => {
              return <Message key={message.id} position={message.g1 ? MESSAGE_POSITION.left : MESSAGE_POSITION.right} >
                {(message.loading ? <Loader /> : message.g1) || (message.loading ? <Loader /> : message.g2)}
              </Message>
            })
          }
        </div>
      </div>
      <Footer onClick={handleStartDebate} />
    </div>
  );
};

export default App;
