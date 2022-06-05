import { Tweet } from "../../components/Tweet"
import { TweetForm } from "../../components/TweetForm"

export const Home = ({user,setSigninUser}) => {
  return (
    <>
      <TweetForm user={user} setSigninUser={setSigninUser} />
      <Tweet name={"Elon Musk"} username={"elonmusk"} avatar={"./images/avatar.png"} content={"Let's make Twitter maximun fun"} />
      <Tweet name={"Cleyton Jesus"} username={"cleyton_jesus07"} avatar={"./images/avatar.png"} content={"@elonmusk Hahaha isso aí Elon Musk!"} />
    </>
  )
}