// Need to use the React-specific entry point to import createApi

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const userdocId= localStorage.getItem("userdocId")

// Define a service using a base URL and expected endpoints
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api/",

    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("jwt");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Post", "user"],

  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: (token) => "posts/?populate=*",
      providesTags: ["Post"],
    }),
    getAllusers: builder.query({
      query: (token) => "users/?populate=*",
      providesTags: ["user"],
    }),
    getSingleUser: builder.query({
      query: (id) => `users/${id}?populate=*`,
      providesTags: ["User"],
    }),
    createNewPost: builder.mutation({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: {
          data: {
            user:newPost.user ,
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
      invalidatesTags: ["Post"],
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
  invalidatesTags: ["Post"],
}),

deletePost: builder.mutation({
  query: (id) => ({
    url: `posts/${id}`,
    method: "DELETE",
  }),
  invalidatesTags: ["Post"],
}),

  }),
}); 

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllPostsQuery,
  useGetAllusersQuery,
  useGetSingleUserQuery,
  useCreateNewPostMutation,
  useEditPostsMutation,
  useDeletePostMutation
} = postApi;
