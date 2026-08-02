interface StatWidgetProps{
    stat: any;
    icon: any;
    text: string;
    p?: string;
    alt?: string;
}

const StatWidget: React.FC<StatWidgetProps> = ({stat, icon, text, alt, p}) => {
  return (
            <div className="stats-style">
                <div className="flex gap-2">
                    <img src={icon} alt={`${alt} icon`} />
                    <p>
                        {text}
                    </p>
                </div>
                <div className="purple-text mt-1">{stat}</div>
                <p className="text-xs opacity-60 font-normal">
                    {p}
                </p>
            </div>
  )
}

export default StatWidget