"use client";

import { createContactData } from "@/app/_actions/contact";
import { useState } from "react";
import styles from "./index.module.css";

const initialState = {
    status: "",
    message: "",
};

export default function ContactForm() {
    const [state, setState] = useState(initialState);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await createContactData(null, formData);

        setState(response); // createContactData が返す結果を state に反映
    };

    if (state.status === "success") {
        return (
            <p className={styles.success}>
                お問い合わせいただき、ありがとうございます。
                <br />
                お返事まで今しばらくお待ちください。
            </p>
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.horizontal}>
                <div className={styles.item}>
                    <label className={styles.label} htmlFor="lastname">
                        姓
                    </label>
                    <input className={styles.textfield} type="text" id="lastname" name="lastname" />
                </div>
                <div className={styles.item}>
                    <label className={styles.label} htmlFor="firstname">
                        名
                    </label>
                    <input className={styles.textfield} type="text" id="firstname" name="firstname" />
                </div>
            </div>
            <div className={styles.item}>
                <label className={styles.label} htmlFor="company">
                    会社名
                </label>
                <input className={styles.textfield} type="text" id="company" name="company" />
            </div>
            <div className={styles.item}>
                <label className={styles.label} htmlFor="email">
                    メールアドレス
                </label>
                <input className={styles.textfield} type="text" id="email" name="email" />
            </div>
            <div className={styles.item}>
                <label className={styles.label} htmlFor="message">
                    メッセージ
                </label>
                <textarea className={styles.textarea} name="message" id="message"></textarea>
            </div>
            <div className={styles.actions}>
                {state.status === "error" && (
                    <p className={styles.error}>{state.message}</p>
                )}
                <input type="submit" value="送信する" className={styles.button} />
            </div>
        </form>
    );
}
