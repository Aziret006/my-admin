const ContactIcon = ({ url, Icon, label }) => (
  <div className="flex flex-col items-center gap-1">
    <NavLink
      target="_blank"
      to={url}
      className="w-[40px] h-[40px] border-[1px] border-[#2222221A] flex justify-center items-center rounded-full"
    >
      <Icon className="w-[24px] h-[24px]" />
    </NavLink>
    <p className="text-[13px] leading-[16px] text-[#222222] font-normal">
      {label}
    </p>
  </div>
);
