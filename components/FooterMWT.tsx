export default function FooterMWT(props: any) {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <div className="mx-auto py-6 px-4">
        <p className="text-base text-gray-400 text-center">&copy; {new Date().getFullYear()} Magic Wizard Tech, Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}
