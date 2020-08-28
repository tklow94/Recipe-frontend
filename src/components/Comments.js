import React from 'react'

function Comments({comments, setComments}) {

 

    return (
        <div>
            <h1></h1>
            <h3 className="comments-title">Kindly leave your thoughts below</h3>
            <h6 className="comments-title">0 comments</h6>
        <form className="comments-form">
          <div className="field">
            <div className="control">
              <textarea className="textarea" name="comment" placeholder="Add a comment"></textarea>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-primary">Submit</button>
            </div>
          </div>
        </form>
        </div>
    )
}

export default Comments
