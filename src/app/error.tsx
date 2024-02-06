"use client";
 
import { useEffect } from "react";
import ButtonStyle from "@/components/Button/ButtonStyle.module.css";
import ErrorStyle from "./styles/ErrorStyle.module.css";
import { analytics } from "@/lib/firebase/firebase";
import { logEvent } from "firebase/analytics";
 
export default function Error({
    error,
    reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
    useEffect(() => {
        console.error(error);
        logEvent(analytics, `Fatal error - website crashed`);
    }, [error]);
 
    return (
        <div className={ErrorStyle.error}>
            <h2>Oops! It appears there was an error.</h2>
            <button className={ButtonStyle.submitButton}
                onClick={
                    () => reset()
                }
            >
        Try again
            </button>
        </div>
    );
}