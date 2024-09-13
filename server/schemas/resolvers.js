const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('savedBooks');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('saveBooks');
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('savedBooks');
            }
            throw AuthenticationError;
        },
    },

    Mutation: {
        addUser: async ({ username, email, password }, res) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async ({ body }, res) => {
            const user = await User.findOne({ email: body.email });

            if (!user) {
                throw AuthenticationError;
            }
            const correctPw = await user.isCorrectPassword(body.password);

            if (!correctPw) {
                throw AuthenticationError;
            }
            const token = signToken(user);

            return { token, user };
        },
        userRemoveBook: async ({ user, params }, res) => {
            const book = await User.findOneAndDelete(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: params.bookId }}  },
                { new: true }
            );
            if (!book){ 
                return res.status(404).json({ message: "Couldn't find user with this id! "});
            }
            return res.json(book);
        },
    },
};

module.exports = resolvers;