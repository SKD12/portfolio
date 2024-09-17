'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Section = ({ id, title, children }: any) => {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <motion.section
      id={id}
      ref={ref}
      className="min-h-screen py-20 flex flex-col justify-center relative"
      style={{ opacity, scale }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-6xl md:text-8xl font-display font-bold mb-12 text-accent">{title}</h2>
        {children}
      </div>
    </motion.section>
  )
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('about')
  const { scrollY } = useScroll()

  const sections = [
    { id: 'about', title: 'About' },
    { id: 'experience', title: 'Experience' },
    { id: 'skills', title: 'Skills' },
    { id: 'projects', title: 'Projects' },
    { id: 'contact', title: 'Contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const pageYOffset = window.pageYOffset
      let newActiveSection = sections[0].id

      sections.forEach((section) => {
        const element = document.getElementById(section.id)
        if (element && pageYOffset >= element.offsetTop - window.innerHeight / 2) {
          newActiveSection = section.id
        }
      })

      setActiveSection(newActiveSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-background text-text font-sans">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background bg-opacity-80 backdrop-blur-md">
        <nav className="container mx-auto px-4 py-6">
          <ul className="flex justify-center space-x-8">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  className={`text-lg font-medium transition-colors duration-200 ${
                    activeSection === section.id ? 'text-accent' : 'text-text hover:text-accent'
                  }`}
                  onClick={() => scrollTo(section.id)}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <Section id="about" title="About">
          <About />
        </Section>
        <Section id="experience" title="Experience">
          <Experience />
        </Section>
        <Section id="skills" title="Skills">
          <Skills />
        </Section>
        <Section id="projects" title="Projects">
          <Projects />
        </Section>
        <Section id="contact" title="Contact">
          <Contact />
        </Section>
      </main>

      <footer className="bg-background py-8">
        <div className="container mx-auto px-4 text-center text-text">
          <p>&copy; 2023 Your Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function About() {
  return (
    <div className="space-y-6 max-w-3xl">
      <p className="text-2xl leading-relaxed">
        Hello, I'm John Doe. I craft digital experiences that blend creativity with technology.
      </p>
      <p className="text-xl">
        With a passion for innovative design and cutting-edge development, I bring ideas to life in the digital realm. My work is a fusion of aesthetics and functionality, always pushing the boundaries of what's possible on the web.
      </p>
    </div>
  )
}

function Experience() {
  const experiences = [
    {
      title: 'Senior Creative Developer',
      company: 'Digital Frontiers Inc.',
      period: '2020 - Present',
      description: 'Spearheading innovative web projects and mentoring junior developers in creative coding techniques.',
    },
    {
      title: 'Interactive Designer',
      company: 'Pixel Perfect Studios',
      period: '2018 - 2020',
      description: 'Designed and developed immersive web experiences, focusing on user engagement and cutting-edge animations.',
    },
  ]

  return (
    <div className="space-y-12">
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <h3 className="text-2xl font-bold text-accent">{exp.title}</h3>
          <p className="text-xl font-medium">{exp.company}</p>
          <p className="text-sm text-text opacity-75 mb-2">{exp.period}</p>
          <p className="text-text">{exp.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

function Skills() {
  const skills = [
    'Creative Coding', 'WebGL', 'Three.js', 'React', 'Node.js', 'GSAP',
    'Shader Programming', 'UI/UX Design', 'Performance Optimization'
  ]

  return (
    <div className="flex flex-wrap gap-4">
      {skills.map((skill, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="border border-accent text-accent px-4 py-2 rounded-full text-sm font-medium"
        >
          {skill}
        </motion.span>
      ))}
    </div>
  )
}

function Projects() {
  const projects = [
    {
      title: 'Immersive 3D Portfolio',
      description: 'A WebGL-powered 3D portfolio showcasing creative works in an interactive virtual gallery.',
      link: 'https://github.com/johndoe/3d-portfolio',
    },
    {
      title: 'Audio Visualizer Experience',
      description: 'A real-time audio visualizer using Web Audio API and Three.js, creating stunning visual representations of music.',
      link: 'https://github.com/johndoe/audio-visualizer',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <h3 className="text-2xl font-bold text-accent mb-2">{project.title}</h3>
          <p className="text-text mb-4">{project.description}</p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline inline-block transition-colors duration-200"
          >
            View Project
          </a>
        </motion.div>
      ))}
    </div>
  )
}

function Contact() {
  return (
    <div className="max-w-xl mx-auto">
      <p className="text-xl mb-6">
        Interested in collaborating or just want to say hi? Feel free to reach out!
      </p>
      <a
        href="mailto:hello@johndoe.com"
        className="text-2xl font-bold text-accent hover:underline"
      >
        hello@johndoe.com
      </a>
    </div>
  )
}
