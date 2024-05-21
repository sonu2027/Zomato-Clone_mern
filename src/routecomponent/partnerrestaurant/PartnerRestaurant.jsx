import React, { useState } from 'react'
import PartnerHomeHeader from '../../component/partnerhomeheader/PartnerHomeHeader.jsx'
import "../partnerhome/partnerhome.css"
import { useSelector } from 'react-redux'
import "./partnerRestaurant.css"
import { useNavigate } from 'react-router-dom'
import { BsThreeDotsVertical } from "react-icons/bs";
import { setPartnerDetail } from '../../store/partnerSlice.js'
import { useDispatch } from 'react-redux'
import { setResDetail } from '../../store/restaurantSlice.js'

function PartnerRestaurant() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const restaurantDetails = useSelector((s) => s.restaurant)
    console.log("resdet: ", restaurantDetails);

    const [showResOption, setShowResOption] = useState(false)
    const [currentElement, setCurrentElement] = useState("")
    const [showDeleteRestaurantOption, setShowDeleteRestaurantOption] = useState(false)
    const [resDelSucc, setResDelSucc] = useState(false)
    const [resDelFail, setResDelFail] = useState(false)

    const handleOption = (event, element) => {
        setShowResOption(!showResOption)
        setCurrentElement(element)
        event.stopPropagation()
    }

    window.addEventListener("click", () => {
        console.log("clicked on window");
        if (showResOption) {
            setShowResOption(false)
            setCurrentElement("")
        }
        if (showDeleteRestaurantOption) {
            // document.body.style.backgroundColor = "rgba(0, 0, 0, 0)"
            // document.body.style.filter = "blur(0)"
            setShowDeleteRestaurantOption(false)
            setCurrentElement("")
        }
    })

    const handleUndoDelete = (event) => {
        event.stopPropagation()
        setShowDeleteRestaurantOption(false)
        setCurrentElement("")
        // document.body.style.backgroundColor = "rgba(0, 0, 0, 0)"
        // document.body.style.filter = "blur(0)"
    }

    const deleteRestaurant = async () => {
        console.log("handleDeleteRestaurant button clicked: ");
        console.log("restaurantDetails from store: ", restaurantDetails);
        console.log("current elemnt selected for delete is: ", currentElement);
        try {
            const response = await fetch("http://localhost:7000/deleterestaurant", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: currentElement._id })
            })
            console.log("Response of delete restaurant: ", response);
            const data = await response.json()
            console.log("data after deleting restaurant: ", data);

            if (response.ok) {
                return currentElement._id
            }
            else {
                console.log("Error while deleting restaurant");
                throw error
            }
        }
        catch (error) {
            console.log("Error while deleting restaurant: ", error);
            throw error
        }
    }

    const handleDeleteRestaurant = async () => {
        deleteRestaurant()
            .then(async (id) => {
                try {
                    const response = await fetch("http://localhost:7000/deletepartnerrestaurant", {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id })
                    })
                    console.log("Response of delete restaurant of partner: ", response);
                    const data = await response.json()
                    console.log("data after deleteing restaurant of partner: ", data);

                    if (response.ok) {
                        let newIds = data.res1[0].restaurantId.filter((e) => e != id)
                        console.log("newids is: ", newIds);
                        dispatch(setPartnerDetail({
                            fullName: data.res1[0].owner_full_name, email: data.res1[0].owner_email, ppURL: "", ppPub_id: "", id: data.res1[0]._id, restaurantId: newIds
                        }))
                        console.log("restaurant deleted successfully: ", data);
                        const resRes = await fetch("http://localhost:7000/partnerrestaurant", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ data: newIds })
                        })
                        console.log("resRes: ", resRes);
                        if (resRes.ok) {
                            const data = await resRes.json()
                            console.log("restaurant find data: ", data);
                            dispatch(setResDetail(data))
                            setResDelSucc(true)
                            setTimeout(() => {
                                setResDelSucc(false)
                                setShowDeleteRestaurantOption(false)
                                setCurrentElement("")
                                navigate("/partner/home")
                            }, 3000)
                        }
                    }
                    else {
                        console.log("Error while deleting restauarnt of partner");
                        throw error
                    }
                }
                catch (error) {
                    setResDelFail(true)
                    setTimeout(() => {
                        setResDelFail(false)
                        setShowDeleteRestaurantOption(false)
                        setCurrentElement("")
                    }, 3000)
                    console.log("Error while deleting restauarnt of partner");
                }
            })
            .catch((error) => {
                console.log("Error while deleting restauarnt", error);
                setResDelFail(true)
                setTimeout(() => {
                    setResDelFail(false)
                    setShowDeleteRestaurantOption(false)
                    setCurrentElement("")
                }, 3000)
            })
    }

    return (
        <div className='partnerRestaurant'>
            <div className='PartnerHome'>
                <PartnerHomeHeader />
            </div>

            {
                restaurantDetails.data.map((e) => <div key={e._id} className='restaurantData'>
                    <div>{e.restaurant_name
                    } | RES ID {e._id}</div>
                    <div>{e.restaurant_complete_address}</div>
                    <div className='image'>
                        <img src={e.restaurant_image_URL} alt="" />
                    </div>
                    <BsThreeDotsVertical className='dot' onClick={(event) => handleOption(event, e)} />
                    {
                        (showResOption && currentElement === e) &&
                        <div onClick={(e) => e.stopPropagation()} className='restaurantOption'>
                            <button onClick={() => navigate("/partner/register/create-your-restaurant", { state: { data: e } })}>Edit</button>
                            <button onClick={(e) => {
                                setShowDeleteRestaurantOption(true)
                                setShowResOption(false)
                                // document.body.style.backgroundColor = "rgba(0, 0, 0, 0.9)"
                                // document.body.style.filter = "blur(2px)"
                            }}>Delete</button>
                        </div>

                    }
                    {
                        (showDeleteRestaurantOption && currentElement === e) &&
                        <div className='showDeleteRestaurantOption'>
                            <div onClick={(e) => e.stopPropagation()} className='box'>
                                <div>Are you sure you want to delete your restaurant?</div>
                                <div>Customer will not able to order and view from your restaurant.</div>
                                <div>It will delete premenantly</div>
                                {
                                    resDelSucc && <div><b>Restaurant deleted successfully</b></div>
                                }
                                {
                                    resDelFail && <div><b>Something went wrong, please try again</b></div>
                                }
                                <div className='button'>
                                    <button onClick={handleUndoDelete} >Cancel</button>
                                    <button onClick={handleDeleteRestaurant}>Delete</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>)
            }
        </div>
    )
}

export default PartnerRestaurant