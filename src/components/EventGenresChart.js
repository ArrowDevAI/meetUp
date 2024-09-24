import { Pie, PieChart, Tooltip, Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { useEffect,useState } from "react";

const EventGenresChart = ({events}) => {
    const [data, setData] = useState([])
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

    useEffect(()=>{
        setData(getData());
    }, [`${events}`])
          
    const getData = () => {
        const data = genres.map(genre => {
        const filteredEvents = events.filter(event => event.summary.includes(genre));
        return {
            name: genre,
            value: filteredEvents.length
          };
    
        });
        return data;
      };
 
    return (
        <ResponsiveContainer width="70%" height={400}>
            <PieChart width={730} height={250}>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
            </PieChart>
        </ResponsiveContainer>
    );
}
export {EventGenresChart};