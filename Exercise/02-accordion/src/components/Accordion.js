import AccordionItem from './AccordionItem';

function Accordion({ data }) {
  return (
    <div className="accordion">
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          num={index}
          title={item.title}
          text={item.text}
        />
      ))}
    </div>
  );
}

export default Accordion;
