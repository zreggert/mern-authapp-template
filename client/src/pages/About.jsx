export default function About() {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold  mb-4 text-slate-800'>About the project</h1>
      <p className='mb-4 text-slate-700'>
        I wanted to build this application so that I could have a very basic yet user friendly template for future web development projects I will be working on in the future. In this application, I have ultilized the MERN stack (MongoDB, Express.js, React.js, and Node.js) to create a function authentication app that allows new users to sign up and current users to log in, update, or delete their profiles. As an added feature, I have enabled OAuth authentication using Google OAuth so anyone with a gmail account can easily sign up.
      </p>
      <br />
      <p className='mb-4 text-slate-700'>
        For the frontend, I have used React to dynamic build the UI with pages and components and React Router to handle client side routing. Tailwaindcss is used for the minimal design and layout work but I plan to use it in the future as I found it very easy to work with and a lot less of a hassle as regular CSS.
      </p>
      <br />
      <p className='mb-4 text-slate-700'>
        Finally, the server side of application consists of a non-relational database using MongoDB to create the user model and Node.js and Express.js to handle server side routing and API calls.
      </p>
    </div>
  )
}
