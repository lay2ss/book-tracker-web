interface StatWidgetProps{
    stat: number;
    icon: string;
    text: string;
    alt?: string;
}

const StatWidget: React.FC<StatWidgetProps> = ({stat, icon, text, alt}) => {
  return (
            <div className="stats-style bg-dark-purple">
                <div className="flex gap-2">
                    <img src={icon} alt={`${alt} icon`} />
                    <p>
                        {text}
                    </p>
                </div>
                <p className="purple-text mt-1">{stat}</p>
            </div>
  )
}

export default StatWidget