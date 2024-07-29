export default function Action({ title, complete, handleChange }) {

  return (
    <>
      <input 
        type="checkbox" 
        checked={complete} 
        onChange={handleChange} 
      />
      <label>{title}</label>
      <br />
    </>
  );
}
