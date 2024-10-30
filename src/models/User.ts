


// Schema Settings:

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
// username
import { Schema, model, Document, ObjectId } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  thoughts: ObjectId[];
  friends: ObjectId[];
}
var validateEmail = function(email:string) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const userSchema =new Schema<IUser>(
    {
        username:{
            type: String,
            required:true,
            unique:true,
            trim: true,
        } ,
        email:{
            type: String,
            required: true, 
            unique: true, 
            validate: [validateEmail, 'Please fill a valid email address'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
        ref: 'Thoughts',
            },
        ],
        friends: [
            {type: Schema.Types.ObjectId,
        ref: 'User',

            }
        ]

        
    },{
       toJSON: {
      virtuals: true,
    },
    id: false,
    }
)
userSchema
.virtual('friendCount')
  .get(function () {
    return this.friends.length

});
const User = model('user', userSchema);

export default User;
