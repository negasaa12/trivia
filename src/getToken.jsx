import axios from "axios";




export const getToken = async () => {

    try {

        const res = await axios("https://opentdb.com/api_token.php?command=request");

        if (!res.status === 200) {
            throw new Error("NETWORK response was not ok");
        }


        console.log("RESPONSE", res.data.token);
        const token = res.data.token;

        return token


    } catch (e) {
        console.log("Error, fetching questions", e);
    }

};


export const apiCategories = async () => {

    try {

        const res = await axios("https://opentdb.com/api_category.php");

        if (!res.status === 200) {
            throw new Error("NETWORK response was not ok");
        }



        const categories = res.data.trivia_categories;
        // console.log(categories);
        return categories;


    } catch (e) {
        console.log("Error, fetching questions", e);
    }

};


