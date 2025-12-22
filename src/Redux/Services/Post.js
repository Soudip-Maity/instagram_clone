// Redux/Services/Post.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("jwt");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Post", "User"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "posts?populate=*",
      // provide tags for each post and a LIST tag to invalidate whole list
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((post) => ({ type: "Post", id: post.id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    getAllUsers: builder.query({
      query: () => "users?populate=*",
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((u) => ({ type: "User", id: u.id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    getSingleUser: builder.query({
      query: (id) => `users/${id}?populate=*`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    createNewPost: builder.mutation({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: {
          data: {
            user: newPost.user,
            title: newPost.title,
            content: [
              {
                type: "paragraph",
                children: [{ type: "text", text: newPost.content, bold: true }],
              },
            ],
          },
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
  


    editPosts: builder.mutation({
      query: ({ documentId, editpost }) => ({
        url: `posts/${documentId}`,
        method: "PUT",
        body: {
          data: {
            user: editpost.user || "",
            title: editpost.title,
            content: [
              {
                type: "paragraph",
                children: [{ type: "text", text: editpost.content, bold: true }],
              },
            ],
          },
        },
      }), 
      invalidatesTags: (result, error, { documentId }) => [
        { type: "Post", id: documentId },
        { type: "Post", id: "LIST" },
      ],
    }),

    editProfile: builder.mutation({
      query: ({ userid, editProfile }) => ({
        url: `users/${userid}`,
        method: "PUT",
        body: {
             username:editProfile.username || "",
             email: editProfile.email,
             password: editProfile.password
        },
      }), 
   
    }),
  


    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Post", id },
        { type: "Post", id: "LIST" },
      ],
    }), 


    addComments: builder.mutation({
      query: (id) => ({
        url: `comments`,
        method: "POST",
        body: {

        }
      }),
    }),

    // Redux/Services/Post.js

addLike: builder.mutation({
  query: ({ postId, userId }) => ({
    url: "likes",
    method: "POST",
    body: {
      data: {
        post: postId,
        user: userId,
      },
    },
  }),
  invalidatesTags: (r, e, { postId }) => [
    { type: "Post", id: postId },
    { type: "Post", id: "LIST" },
  ],
}),

removeLike: builder.mutation({
  query: (likeId) => ({
    url: `likes/${likeId}`,
    method: "DELETE",
  }),
  invalidatesTags: [{ type: "Post", id: "LIST" }],
}),





  }),
});

export const {
  useGetAllPostsQuery,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useCreateNewPostMutation,
  useEditPostsMutation,
  useDeletePostMutation,
  useEditProfileMutation,
  useAddCommentsMutation,
  useAddLikeMutation,
  useRemoveLikeMutation,
} = postApi;
