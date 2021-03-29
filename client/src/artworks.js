import axios from "./axios";

import { useDispatch, useSelector } from "react-redux";

import { addArtImage, addArtInfo } from "./actions";

export default function Artworks() {
    const dispatch = useDispatch();
    const { art_name, art_type, art_title, art_url } = useSelector((state) => {
        return state;
    });

    async function uploadArtwork() {
        console.log("in state", art_name, art_type, art_title, art_url);
    }
    var formData = new FormData();

    formData.append("file", art_url);
    formData.append("title", art_name);
    formData.append("type", art_type);
    formData.append("tags", art_title);
    return (
        <div>
            <div id="artist-images">
                {this.state.error && <p>something went wrong</p>}
                UPLOAD YOUR WORK
                <input
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={(e) => {
                        dispatch(addArtImage(e.target.files[0]));
                    }}
                />
                <input
                    name="title"
                    placeholder="title"
                    onChange={(e) => {
                        dispatch(addArtInfo(e.target.files[0]));
                    }}
                />
                <select
                    name="type"
                    onChange={(e) => {
                        dispatch(addArtInfo(e.target.files[0]));
                    }}
                >
                    <option value="select">select</option>

                    <option value="video">video</option>
                    <option value="image">image</option>
                </select>
                <select
                    name="tags"
                    onChange={(e) => {
                        dispatch(addArtInfo(e.target.files[0]));
                    }}
                >
                    <option value="select">select</option>

                    <option value="3d">3d</option>
                    <option value="animation">animation</option>
                    <option value="drawing">drawing</option>
                    <option value="gan">gan</option>
                    <option value="responsive">responsive</option>
                </select>
                <button onClick={uploadArtwork}>submit</button>
            </div>
        </div>
    );
}
