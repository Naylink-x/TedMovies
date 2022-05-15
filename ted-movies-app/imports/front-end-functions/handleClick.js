import axios from "axios";

function handleClick(movie, icon, moviesData, setMoviesData) {
    axios.put(`http://localhost:3000/api/${icon}/${movie}`).then(resp => {
        const newData = [...moviesData]
        newData.map((el, index) => {
            if (resp.data.id === el.id) {
                icon === "like" ? el.like = resp.data.like : icon === 'star' ? el.star = resp.data.star : console.log('invalid endpoint');
            }
        })

        setMoviesData(newData);
    })
}

export default handleClick