import React, { useState } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom' 
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import copy from 'copy-to-clipboard'

import './Questions.css'
import Up from '../../Assets/caret-up-solid.svg'
import Down from '../../Assets/caret-down-solid.svg'
import Avatar from '../../Components/Avatar/Avatar'
import DisplayAnswers from './DisplayAnswers'
import { postAnswer, deleteQuestion, voteQuestion } from '../../actions/question'


const QuestionDetails = () => {

    const { id } = useParams()
    const questionsList = useSelector(state => state.questionsReducer)

    const [Answer, setAnswer] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const User = useSelector((state) => (state.currentUserReducer))
    const location = useLocation()
    const url = 'http://localhost:3000'
    
    const handlePostAns = (e, answerLength) => {
        e.preventDefault()
        if(User === null) {
            alert('Login or Signup to answer a question')
            navigate('/Auth')
        } else {
            if (Answer === '') {
                alert('Enter an answer before submiting')
            } else {
                dispatch(postAnswer({id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: User.result.name, userId: User.result._id}))
            } 
        }
    }

    const handleShare = () => {
        copy( url + location.pathname)
        alert('Copied url : '+url + location.pathname)
    } 

    const handleDelete = () => {
        dispatch(deleteQuestion(id, navigate))
    }

    const handleUpVote = () => {
        if(User === null) {
            alert('Login or Signup to vote this question')
            navigate('/Auth')
        } else {
        dispatch(voteQuestion(id, 'upVote', User.result._id))
        }
    }

    const handleDownVote = () => {
        if(User === null) {
            alert('Login or Signup to vote this question')
            navigate('/Auth')
        } else {
        dispatch(voteQuestion(id, 'downVote', User.result._id))
        }
    }

    return (
        <div className='question-details-page'>
            {
                questionsList.data === null ?
                <h1>Loading...</h1> :
                <>
                    {
                        questionsList.data.filter( question => question._id === id).map((question) => (
                            <div key={question._id}>
                                <section className='question-details-container'>
                                    <h1>{question.questionTitle}</h1>
                                    <div className='question-details-container-2'>
                                        <div className='question-votes'>
                                            <img src={Up} alt='' width='15px' className="votes-icon" onClick={handleUpVote}/>
                                            <p>{ question.upVote.length - question.downVote.length }</p>
                                            <img src={Down} alt='' width='15px' className="votes-icon" onClick={handleDownVote}/>
                                        </div>
                                        <div style={{width: "100%"}}>
                                            <p className='question-body'>{question.questionBody}</p>
                                            <div className='question-details-tags'>
                                                {
                                                    question.questionTags.map((tag) => (
                                                        <p key={tag}>{tag}</p>
                                                    ))
                                                }
                                            </div>
                                            <div className='question-action-user'>
                                                <div>
                                                    <button type='button' onClick={handleShare}>Share</button>
                                                    {
                                                        User?.result?._id === question?.userId && (
                                                            <button type='button' onClick={handleDelete}>Delete</button>
                                                        )
                                                    }
                                                </div>
                                                <div>
                                                    <p>asked {moment(question.askedOn).fromNow()}</p>
                                                    <Link to={`/Users/${question.userId}`} className='user-link' style={{color: '#0086d8'}}>
                                                        <Avatar backgroundColor="orange" px="5px" py="7px" borderRadius="10%">{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                        <div>
                                                            {question.userPosted}
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {
                                    question.noOfAnswers !== 0 && (
                                        <section>
                                            <h3>{question.noOfAnswers} Answers</h3>
                                            <DisplayAnswers key={question._id} question={question} handleShare={handleShare}/>
                                        </section>
                                    )
                                }
                                <section className='post-ans-container'>
                                    <h3>Your Answer</h3>
                                    <form onSubmit={ (e) => { handlePostAns(e, question.answer.length) }}>
                                        <textarea name="" id="" cols="30" rows="10" onChange ={e => setAnswer(e.target.value)}></textarea><br/>
                                        <input type="Submit" className='post-ans-btn' value='post your answer'/>
                                    </form>
                                    <p>
                                        Browse Other Question tagged
                                        {
                                            question.questionTags.map((tag) => (
                                                <Link to='/Tags' key={tag} className='ans-tag'>{tag}</Link>
                                            ))
                                        } or 
                                        <Link to='/AskQuestion' style={{textDecoration: "none", color: "#009dff"}}> ask your own question.</Link>
                                    </p>
                                </section>
                            </div>
                        ))
                    }
                </>
            }
        </div>
    )
}

export default QuestionDetails
