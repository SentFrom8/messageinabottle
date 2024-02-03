import { BottleMessage } from "@/lib/utils/types";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RatingStyle from "./RatingStyle.module.css";
import { useEffect, useState } from "react";
import { updateMessage } from "@/lib/utils/actions";

type RatingProps = {
    message: BottleMessage
}

type RatingType = "liked" | "disliked" | "unrated" | "initial";



const Rating = (props: RatingProps) => {

    const [rating, setRating] = useState<RatingType>("initial");

    const [ratingPrevious, setratingPrevious] = useState<RatingType>("initial");

    const [likesOptimistic, setLikesOptimistic] = useState(props.message.likes);

    const [dislikesOptimistic, setDislikesOptimistic] = useState(props.message.dislikes);

    const handleClick = (rate: RatingType) => {
        setratingPrevious(rating);
        if (rate === rating) {
            setRating("unrated");
        }
        else {
            setRating(rate);
        }

    };

    //if API fails to update, reverts state to previous value
    const handleError = async (message: BottleMessage) => {
        const updateResult = await updateMessage(message);
        if (!updateResult) {
            setLikesOptimistic(props.message.likes);
            setDislikesOptimistic(props.message.dislikes);
            setRating(ratingPrevious);
        }
    };
    

    //if rating and previous rating are same, it means the api call failed (unless it's initial)
    //in this case api will not be called again
    useEffect(() => {
        if (rating !== "initial" && rating !== ratingPrevious) {
            var likes = props.message.likes;
            var dislikes = props.message.dislikes;

            if (ratingPrevious === "disliked") {
                dislikes = props.message.dislikes - 1;
            }

            if (ratingPrevious === "liked") {
                likes = props.message.likes - 1;
            }

            switch (rating) {
                case "liked":
                    likes += 1;
                    
                    break;
                case "disliked":
                    dislikes += 1;
                    
                    break;
            }
            setLikesOptimistic(likes);
            setDislikesOptimistic(dislikes);

            handleError({ ...props.message, likes: likes, dislikes: dislikes });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rating]);

    return (
        <div className={RatingStyle.rating}>
            <button className={`${RatingStyle.thumb} ${rating === "liked" && RatingStyle.rated}`} 
                onClick={() => handleClick("liked")}
                onKeyUp={e => {if (e.key === "Enter") {handleClick("liked");}}}>
                <FontAwesomeIcon icon={faThumbsUp}/>
                {likesOptimistic}
            </button>
            <button className={`${RatingStyle.thumb} ${rating === "disliked" && RatingStyle.rated}`} 
                onClick={() => handleClick("disliked")}
                onKeyUp={e => {if (e.key === "Enter") {handleClick("disliked");}}}>
                <FontAwesomeIcon icon={faThumbsDown}/>
                {dislikesOptimistic}
            </button>
        </div>
    );
};

export default Rating;