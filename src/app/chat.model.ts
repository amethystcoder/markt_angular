export interface Comment{
    comment_body:string,
    comment_place:string,
    comment_place_id:string,
    commenter:string,
    comment_title:string,
    rating:number
  }
  
  export interface RetrievedComment{
    comment_body:string,
    comment_place:string,
    comment_place_id:string,
    commenter:string,
    comment_title:string,
    rating:number
  }
  
  export interface Review{
    comments:RetrievedComment[],
    rating:number
  }
  
  export interface Chats{
    user_id:string,
    user_name:string,
    user_profile_image:string,
    user_type:string,
    messages:any[]
  }
  
  export interface Chat{
    sent_to:string,
    sent_from:string,
    status:string,
    send_date_and_time:string,
    message:string
  }