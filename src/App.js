import React from 'react';
import axios from "axios";
import Post from "./components/Post";
import {useDispatch, useSelector} from "react-redux";
import {setPost} from "./redux/actions/posts";
import {changeSite} from "./redux/actions/sites";

function App() {

    const dispatch = useDispatch()
    const post = useSelector(({posts}) => posts.post)
    const site = useSelector(({sites}) => sites)
    console.log(site)

    function fetchPost() {
        dispatch(setPost([]))
        axios.get('https://5f65baa743662800168e6ed8.mockapi.io/posts')
            .then(({data}) => {
                dispatch(setPost(data))
            })
    }

    return (
        <div className="App">
            <h3>Сайт:{site.site}</h3>
            <ul>
                <li>
                    <button onClick={() => dispatch(changeSite('site1743'))}>1743.ru</button>
                </li>
                <li>
                    <button onClick={() => dispatch(changeSite('ural56'))}>ural56.ru</button>
                </li>
            </ul>
            <hr/>
            <button onClick={fetchPost}>Загрузить новости</button>
            <div>
                {
                    !post ? <span>Загрузка...</span> :
                        post.map(({image, title, description}, index) => (
                                <Post
                                    key={index + title}
                                    image={image}
                                    description={description}
                                    title={title}
                                />
                            )
                        )
                }
            </div>
        </div>
    );
}

export default App;
