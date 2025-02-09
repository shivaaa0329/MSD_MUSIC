import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config';

export default class PlayScreen extends React.Component {
    
    state = {
        song: [],
        qOne: [],
        qTwo: []
    }

    componentDidMount() {
        axios.get(`${config.API_URL}/song?id=${this.props.match.params.id}`)
            .then(res => {
                var song = res.data;

                if (song.result === "false") {
                    document.title = `Error | Musicder`
                    this.setState({ song })
                } else {
                    document.title = `Download ${song.song} | Musicder`
                    this.setState({
                        song,
                        qOne: song.other_qualities[0].url,
                        qTwo: song.other_qualities[2].url
                    })
                }
            })
    }

    render() {
        if (this.state.song.result === "false") {
            return (
                <div className="errres">
                    <div className="mainerr">
                        <p className="errtxt">
                            Sorry Nothing Found Please Search
                       </p>
                        <Link to={'../'}>
                            <p className="activityb errsc">Search</p>
                        </Link>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1 className="dldheading">
                        Download {this.state.song.song}
                    </h1>
                    <p className="dldquality">
                        Please select your preferred quality
                </p>
                    <div className="center">

                        <a href={this.state.qOne} className="dldactivityb">96 Kbps</a><br />
                        <a href={this.state.song.media_url} className="dldactivityb">128 Kbps</a><br />
                        <a href={this.state.qTwo} className="dldactivityb">320 Kbps</a><br />

                    </div>

                    <div className="dldfooter">
                        <h1 className="playlogo">MSD Music</h1>
                        <a className="atextdec" href={`https://telegram.dog/msd_movies`}>
                            <p className="playparagone" >This MSD Music services is provided by MSD MOVIES</p>
                        </a>
                        <a href={`https://github.com/shivaaa0329/MSD_MUSIC`}>
                            <img alt="Github" className="center" src="../img/github-black.svg" width="30" height="30" />
                        </a>
                    </div>
                </div>
            )
        }
    }
}
