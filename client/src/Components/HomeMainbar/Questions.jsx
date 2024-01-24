import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Questions = ({question}) => {
  return (
    <div className="display-question-container">
        <div className="display-vote-container">
            <p>{ question.upVote.length - question.downVote.length }</p>
            <p>votes</p>
        </div>
        <div className="display-vote-container">
            <p>{question.noOfAnswers}</p>
            <p>answers</p>
        </div>
        <div className="display-questions-details">
            <Link to = {`/Questions/${question._id}`} className="question-title-link">{question.questionTitle}</Link>
            <div className="display-tags-times">
                <div className="display-tags">
                    {
                        question.questionTags.map((tag) => (
                            <p key="tag">{tag}</p>
                        ))
                    }
                </div>
                <div className="display-time">
                    <p>asked {moment(question.askedOn).fromNow()} by {question.userPosted}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Questions
