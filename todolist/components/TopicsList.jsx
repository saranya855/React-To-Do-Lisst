import Link from "next/link";
import RemoveBtn from "./RemoveBtn"
import {HiPencilArt} from "react-icons/hi";
import { icons } from "react-icons";
import { FaBeer } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';

const getTopics=async()=>{
    try{
        const res=await fetch("http://localhost:3000/api/topics",{
            cache:"no-store",
        });
        if(!res.ok){
            throw newError("Failed to fetch data");
        }

        return res.json();


    }
    catch(error){

        console.log("ERROR LOADING TOPICS:",error)
    }

}

export default async function TopicsList()
{

    const {topics}=await getTopics();

    return (
    <>
    {topics.map(t=>(
    <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
        <div>
            <h2 className="font-bold text-2xl">
                {/* Topic Title */}
                {t.title}
            </h2>
            <div>
                {/* Topic Description */}
                {t.description}
            </div>
            </div>
            <div className="flex gap-2"> 
                <RemoveBtn id={t._id}/>
                <Link href={`/editTopic/${t._id}`}>
                    {/* <HiPencilArt size={24}/> */}
                    {/* <FaStar size={24}/> */}
                    <FaEdit size={24} />

                </Link>

            </div>
       
    </div>
    ))}
    </>
    );
}