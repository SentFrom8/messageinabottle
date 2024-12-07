import { updateMessage } from "@/lib/utils/actions";
import { BottleMessage } from "@/lib/utils/types";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RatingStyle from "./RatingStyle.module.css";
import { useEffect, useState } from "react";

type RatingProps = {
    message: BottleMessage
}

type RatingType = "liked" | "disliked" | "unrated";



const Rating = (props: RatingProps) => {

    const [rating, setRating] = useState<RatingType>("unrated");

    const [likesOptimistic, setLikesOptimistic] = useState(props.message.likes);

    const [dislikesOptimistic, setDislikesOptimistic] = useState(props.message.dislikes);

    const [pending, setPending] = useState(false);
    

    const handleClick = async (rate: RatingType) => {
        setPending(true);
        let likes = props.message.likes;
        let dislikes = props.message.dislikes;
        
        let unrated = false;
        if (rating === "disliked") {
            dislikes --;
        }

        if (rating === "liked") {
            likes --;
        }

        switch (rate) {
            case rating: 
                unrated = true;
                break;
            case "liked": 
                likes +=1;
                break;
            case "disliked": 
                dislikes+=1;
                break;
        }
        setLikesOptimistic(likes);
        setDislikesOptimistic(dislikes);

        const updateResult = await updateMessage({ ...props.message, likes: likes, dislikes: dislikes });
        if (updateResult) {
            setRating(unrated ? "unrated" : rate);
        } else {
            setLikesOptimistic(props.message.likes);
            setDislikesOptimistic(props.message.dislikes);
        }
        setPending(false);
    };

    useEffect(() => {
        setLikesOptimistic(props.message.likes);
        setDislikesOptimistic(props.message.dislikes);
    
    }, [props.message]);
    

    return (
        <div className={RatingStyle.rating}>
            <button className={`${RatingStyle.thumb} ${rating === "liked" && RatingStyle.rated} ${pending && RatingStyle.pending}`} 
                onClick={() => handleClick("liked")}
                onKeyUp={e => {if (e.key === "Enter") {handleClick("liked");}}}
                disabled={pending}>
                <FontAwesomeIcon icon={faThumbsUp}/>
                {likesOptimistic}
            </button>
            <button className={`${RatingStyle.thumb} ${rating === "disliked" && RatingStyle.rated} ${pending && RatingStyle.pending}`} 
                onClick={() => handleClick("disliked")}
                onKeyUp={e => {if (e.key === "Enter") {handleClick("disliked");}}}
                disabled={pending}>
                <FontAwesomeIcon icon={faThumbsDown}/>
                {dislikesOptimistic}
            </button>
        </div>
    );
};

export default Rating;