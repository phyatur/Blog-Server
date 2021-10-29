const { ApolloServer, gql } = require("apollo-server");

let typeDefs = gql`
    type Blog {
        id: ID!
        author: String!
        title: String!
        body: String!
        likesCount: Int
        comments: [String]
        reply: [String]
    }

    type Query {
        blogs: [Blog]
        blog(title: String!): Blog
    }

    type Mutation {
        createBlog(author: String!, title: String!, body: String!): Blog
        
        updateBlog(id: ID!, author: String, title: String, body: String): Blog

        deleteBlog(id: ID!): Boolean

        likeBlog(id: ID!): Blog

        unlikeBlog(id: ID!): Blog

        commentBlog(id: String!, comments:String!): Blog

        deleteComment(id: ID!, comments:String!): Blog

        reply(id: ID!, reply: String!): Blog
    }
    #typeSubscription
`;

const resolvers = {
    Query: {
        blogs: () => blogs,
        blog: (parent, args) => blogs.find(blog => blog.title === args.title)
    },
    Mutation: {
        createBlog: (parent, args) => {
            const { author, title, body } = args;
            const blog = { author, title, body };
            blogs.push(blog);
            return blog;
        },

        updateBlog: (parent, args) => {
            const { id, author, title, body } = args;
            const blog = { id, author, title, body };
            blogs[id] = {
        ...blogs[id],
        ...blog,
            };
        return blogs.id
            },

        deleteBlog: (parent, args) => {
            const { id } = args;
            const Bool = Boolean(blogs[id]);
            delete blogs[id];
            return { Bool };
        },

        likeBlog: (parent, args) => {
            const { id, likesCount } = args;
            const add = blogs[likesCount]
                add++
        return blogs
        },

        unlikeBlog: (parent, args) => {
            const { id, likesCount } = args;
            const blog = { id, likesCount };
            blogs[likesCount] = -1
            return blogs;
        },

        commentBlog: (parent, args) => {
            const { comments } = args;
            const com = { comments };
            blogs[comments]= com;
            return blogs;
            },

        deleteComment: (parent, args) => {
            const {id, comments } = args;
            const comment = { id };
            comments.unshift(comment[id])
            return blogs;
            },
        
        reply: (parent, args) => {
            const { id, reply} = args;
            const rep = { reply };
            blogs[reply]= rep;
            return blogs;
        }
        }
    }

const blogs = [
    {
        id: 0,
        author: "Sheriff Fiattor",
        title: "Why assignments our waste time",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        likes: 1000,
        comment: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam",
        reply: "Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
    },
    {
        id: 1,
        author: "Edmund Fiattor",
        title: "Why codes",
        body: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
        likes: 999,
        comment: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
        reply: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    },
];


const server = new ApolloServer({typeDefs, resolvers});

server.listen(8000).then(({ url }) => {
    console.log(`🚀  Server ready at ${ url }`);
}).catch(err => console.log(err.message));

