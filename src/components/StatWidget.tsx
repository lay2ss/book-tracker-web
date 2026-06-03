interface StatWidgetProps{
    stat: any;
    icon: any;
    text: string;
    alt?: string;
}

const StatWidget: React.FC<StatWidgetProps> = ({stat, icon, text, alt}) => {
  return (
            <div className="stats-style">
                <div className="flex gap-2">
                    <img src={icon} alt={`${alt} icon`} />
                    <p>
                        {text}
                    </p>
                </div>
                <div className="purple-text mt-1">{stat}</div>
            </div>
  )
}

export default StatWidget