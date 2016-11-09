import React from 'react';
import {unixTimeToString} from '../util.js';
import {Link} from 'react-router';
import {likeCommentItem, unlikeCommentItem} from '../server';

export default class Comment extends React.Component {

	constructor(props) {
		super(props);
		this.state = props.data;
		this.state.feedItemID = props.feedItemID;
		this.state.commentID = props.commentID;
	}

	didUserLikeComment() {
		var commentLikeCounter = this.state.commentLikeCounter;
		var liked = false;
		for (var i = 0; i < commentLikeCounter.length; i++) {
			if (commentLikeCounter[i] === 4) {
				liked = true;
				break;
			}
		}
		return liked;
	}

	handleCommentLikeClick(clickEvent) {
		clickEvent.preventDefault();
		if (clickEvent.button === 0) {
			var callbackFunction = (updatedLikeCounter) => {
				this.setState({commentLikeCounter: updatedLikeCounter});
			};
			if (this.didUserLikeComment()) {
				unlikeCommentItem(this.state.feedItemID, this.state.commentID, 4, callbackFunction);
			} else {
				likeCommentItem(this.state.feedItemID, this.state.commentID, 4, callbackFunction);
			}
		}
	}

	render() {
		var likeButtonText = "Like";
		if (this.didUserLikeComment()) {
			likeButtonText = "Unlike";
		}

		return (
			<div>
				<div className="media-left media-top">
					PIC
				</div>
				<div className="media-body">
					<Link to={"/profile/" + this.props.author._id}>
						{this.props.author.fullName}
					</Link> {this.props.children}
					<br />
					<a href="#" onClick={(e) => this.handleCommentLikeClick(e)}>
						<span className=""></span>
						{likeButtonText}
					</a> · <a href="#">Reply</a> · <a href="#">
					{this.state.commentLikeCounter.length} <span className="glyphicon glyphicon-thumbs-up">
					</span></a> · {unixTimeToString(this.props.postDate)}
				</div>
			</div>
		)
	}
}
