import styled from "styled-components";

// flex justify-between items-center bg-gray-300 px-4 md:px-12 py-4
const Nav = styled.nav`
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1rem; 
  padding-left: 1rem;
  padding-right: 1rem; 
  justify-content: space-between; 
  align-items: center;
  background-color: #D1D5DB;  

  @media (min-width: 768px) { 
    padding-left: 3rem;
    padding-right: 3rem; 
  }
`;

// hidden md:flex flex-row list-none bg-[#f9f9f9] rounded-full px-6 py-3 gap-6
const DesktopUl = styled.ul`
  display: none; 
  padding-top: 0.75rem;
  padding-bottom: 0.75rem; 
  padding-left: 1.5rem;
  padding-right: 1.5rem; 
  flex-direction: row; 
  gap: 1.5rem; 
  border-radius: 9999px; 
  list-style-type: none; 
  background: #f9f9f9;


  @media (min-width: 768px) { 
    display: flex; 
  }
`;

// px-4 font-semibold text-lg
const Li = styled.li`
  padding-left: 1rem;
  padding-right: 1rem; 
  font-size: 1.125rem;
  line-height: 1.75rem; 
  font-weight: 600; 
`;

// px-3 py-2 md:px-4 bg-blue-500 rounded-md border-2 border-blue-700 
// font-semibold text-white text-base md:text-lg
const LoginButton = styled.button`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem; 
  padding-left: 0.75rem;
  padding-right: 0.75rem; 
  border-radius: 0.375rem; 
  border-width: 2px; 
  border-color: #1D4ED8; 
  font-size: 1rem;
  line-height: 1.25rem; 
  font-weight: 600; 
  color: #ffffff; 
  background-color: #3B82F6; 


  @media (min-width: 768px) { 
    padding-left: 1.25rem;
    padding-right: 1.25rem; 
    font-size: 1.125rem;
    line-height: 1.75rem; 
  }
`;

export { Nav, DesktopUl, Li, LoginButton };