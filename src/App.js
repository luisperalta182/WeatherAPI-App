import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdThunderstorm, IoMdSearch } from 'react-icons/io';
import { BsCloudHaze2Fill, BsCloudDrizzleFill } from 'react-icons/bs';
import { ImSpinner8 } from 'react-icons/im';
 

const APIkey = '1cdbec9cc466bdf4221edbda0f5e4914';


const App = () => {

    const [location, setLocation] = useState('Nicaragua');
    const [data, setData] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);

    const handleInput = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = (e) => {
        // console.log(inputValue);
        if(inputValue !== ''){
            setLocation(inputValue);
        } else {
            setAnimate(true);
        }

        const input = document.querySelector('input');
        input.value = '';

        e.preventDefault();
    }

    const handleCity = (e) => {
        setLocation(e);
    }

    useEffect(() => {

        setLoading(true);

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

        axios.get(url).then(res => {
            setTimeout(() => {
                // setAnimate(false);
                setData(res.data);
                setLoading(false);
            }, 1500)
        }).catch(err=> {
            setLoading(false);
            setErrorMsg(err);
        })
    }, [location]);

    useEffect(()=> {
        const timer = setTimeout(()=> {
            setErrorMsg('')
        }, 2000)
        return()=> clearTimeout(timer);
    }, [errorMsg]);

    let icon;

    // console.log(data?.weather[0]?.main)

    switch(data?.weather[0]?.main){
        case 'Clouds':
            icon = <IoMdCloudy />
            break;
        case 'Haze':
            icon = <BsCloudHaze2Fill />
            break;
        case 'Rain':
            icon = <IoMdRainy />
            break;
        case 'Clear':
            icon = <IoMdSunny />
            break;
        case 'Drizzle':
            icon = <BsCloudDrizzleFill />
            break;
        case 'Snow':
            icon = <IoMdSnow />
            break;
        case 'Thunderstorm':
            icon = <IoMdThunderstorm />
            break;
    };

    if (!data){
        return(
            <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center'>
                <div>
                    <ImSpinner8 className='text-5xl animate-spin text-white' />
                </div>
            </div>
        )
    }

    console.log(data);

    const date = new Date();
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const month = ["Jan","Feb","March","April","May","June","July","August","Sept","Oct","Nov","Dec"];

  return(
    <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center lg:bg-[55%_90%] lg:bg-[length:150%] flex flex-col lg:flex-row lg:ustify-between lg:items-end'>
        {errorMsg && <div className='w-full max-w-[90vw] lg:max-w-[450px] text-white'>{`${errorMsg.response.data.message}`}</div>}
        <div className='pb-[100px] pt-[50px]  lg:pt-[0px] lg:px-10'>
            <div className='flex flex-col lg:flex-row items-center'>
                <div className='flex flex-cols lg:flex-row px-[30px]'>
                    <p className='text-white text-9xl'>{parseInt(data.main.temp)}°</p>
                    {/* <WiDegrees  className='text-white max-w-7xl	text-[130px]'/> */}
                </div>
                <div className='flex flex-col lg:flex-row justify-center items-center'>
                    <div>
                        <p className='text-white text-[50px] leading-none'>{data.name}</p>
                        <p className='text-white text-[16px] font-light pt-[5px]'>{date.getUTCHours()}:{date.getUTCMinutes()} - {weekday[date.getUTCDate()]}, {month[date.getUTCMonth()]} {date.getUTCFullYear()}</p>
                    </div>
                    <div className='flex flex-col justify-center items-center px-[30px]'>
                        <p className='text-white text-[50px] text-center'>{icon}</p>
                        <p className='text-white text-[16px] font-light text-center'>{data.weather[0].main}</p>
                    </div>
                </div>
            </div>
        </div>

        <div className='bg-[#356388]/[0.6] w-auto lg:absolute top-0 right-0 lg:w-[450px] lg:h-screen pt-[30px] px-[40px]'>
            <form className={`
            ${
                animate ? 'animate-shake' : 'animate-none'
            }
            `}>
                <div className='h-full relative flex items-center justify-between'>
                    <input onChange={(e) => handleInput(e)} className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[16px] font-light h-full' type="text" placeholder='Search by City or Country' />
                    <button onClick={(e) => handleSubmit(e)} className='bg-transparent w-20 h-12 flex justify-center items-center transition'><IoMdSearch className='text-2xl text-white' /></button>
                </div>
            </form>
            <div className='bg-white/[0.6] h-[1px] mt-[20px] mb-[40px]'></div>
            <div className='hidden lg:block'>
                <p className='text-white pb-[15px]'>Other Cities</p>
                <div className='py-[20px]'>
                    <p onClick={(e) => handleCity('Managua')} className='cursor-pointer text-white/[0.6] capitalize'>Managua</p>
                </div>
                <div className='py-[20px]'>
                    <p onClick={(e) => handleCity('San Jose, CR')} className='cursor-pointer text-white/[0.6] capitalize'>San Jose, CR</p>
                </div>
                <div className='py-[20px]'>
                    <p onClick={(e) => handleCity('Guatemala City')} className='cursor-pointer text-white/[0.6] capitalize'>Guatemala City</p>
                </div>
                <div className='py-[20px]'>
                    <p onClick={(e) => handleCity('Tegucigalpa')} className='cursor-pointer text-white/[0.6] capitalize'>Tegucigalpa</p>
                </div>
            </div>

            <div className='bg-white/[0.6] h-[1px] mt-[20px] mb-[40px] hidden lg:block'></div>
            <p className='text-white pb-[15px]'>Weather Details</p>
            <div>
                <div className='flex flex-row justify-between py-[20px]'>
                    <p className='text-white/[0.6]'>Clouds</p>
                    <p className='text-white'>{data.visibility / 1000}km</p>
                </div>
                <div className='flex flex-row justify-between py-[20px]'>
                    <p className='text-white/[0.6]'>Humidity</p>
                    <p className='text-white'>{data.main.humidity}%</p>
                </div>
                <div className='flex flex-row justify-between py-[20px]'>
                    <p className='text-white/[0.6]'>Wind</p>
                    <p className='text-white'>{data.wind.speed}m/s</p>
                </div>
                <div className='flex flex-row justify-between py-[20px]'>
                    <p className='text-white/[0.6]'>Feels like</p>
                    <p className='text-white'>{parseInt(data.main.feels_like)}°</p>
                </div>
            </div>
            <div className='bg-white/[0.4] h-[1px] mt-[20px] mb-[40px]'></div>
        </div>
    </div>
  );
};

export default App;