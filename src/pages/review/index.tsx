import Navbar from "../../../components/Navbar/Navbar";
import Reviewpage from "../../../components/review/Review";
import Footer from "../../../components/Footer/Footer"
import { useEffect, useState } from "react";
import axios from "axios";
function Review() {
  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const cookieResponse = await axios.get('/api/cookie')
        setUserId(cookieResponse.data.user.id)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUserId()
  }, [])
  return (
    <div>
      <Navbar />
      <Reviewpage  id={userId}/>
      <Footer />

    </div>
  );
}

export default Review;
