import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const skills = [
  {
    name: 'HTML + CSS',
    color: 'orange',
    level: 'advanced',
  },
  {
    name: 'JavaScript',
    color: 'yellow',
    level: 'advanced',
  },
  {
    name: 'TypeScript',
    color: 'purple',
    level: 'beginner',
  },
  {
    name: 'React',
    color: 'blue',
    level: 'beginner',
  },
  {
    name: 'Next.js',
    color: 'pink',
    level: 'beginner',
  },
  {
    name: 'Git + GitHub',
    color: 'gray',
    level: 'intermediate',
  },
  {
    name: 'Angular',
    color: 'red',
    level: 'intermediate',
  },
];

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <img
      className="avatar"
      src="https://placehold.co/50x50"
      alt=""
    />
  );
}

function Intro() {
  return (
    <div className="intro">
      <h1>Dennis Baust</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      {skills.map((skill) => (
        <Skill
          skill={skill}
          key={skill.name}
        />
      ))}
    </div>
  );
}

function Skill({ skill }) {
  return (
    <div
      className="skill"
      style={{ backgroundColor: skill.color }}
    >
      <span>{skill.name}</span>
      <span>
        {skill.level === 'advanced' && '💪'}
        {skill.level === 'intermediate' && '👍'}
        {skill.level === 'beginner' && '🤔'}
      </span>
      {/* {skill.name} {skill.level === 'advanced' ? '💪' : skill.level === 'intermediate' ? '👍' : '🤔'} */}
      {/* <img
        src={skill.level === 'advanced' ? '💪' : skill.level === 'beginner' ? '🤔' : '👍'}
        alt={skill.name}
      /> */}
    </div>
  );
}

// function SkillList() {
//   return (
//     <div className="skill-list">
//       <Skill
//         skill="React"
//         emoji="👩"
//         color="blue"
//       />
//       <Skill
//         skill="JavaScript"
//         emoji="👩"
//         color="yellow"
//       />
//       <Skill
//         skill="Git"
//         emoji="👩"
//         color="gray"
//       />
//       <Skill
//         skill="Next.js"
//         emoji="👩"
//         color="pink"
//       />
//     </div>
//   );
// }

// function Skill(props) {
//   return (
//     <div
//       className="skill"
//       style={{ backgroundColor: props.color }}
//     >
//       <span>{props.skill}</span>
//       <span>{props.emoji}</span>
//     </div>
//   );
// }

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
