"use client";
 
import { useEffect } from "react";
import ButtonStyle from "./components/Button/ButtonStyle.module.css";
import ErrorStyle from "./styles/ErrorStyle.module.css";
 
export default function Error({
    error,
    reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
    useEffect(() => {
    // Log the error to an error reporting service
        console.error(error);
    }, [error]);
 
    return (
        <div className={ErrorStyle.error}>
            <h2>Oops! It appears there was an error.</h2>
            <button className={ButtonStyle.submitButton}
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
        Try again
            </button>
        </div>
    );
}