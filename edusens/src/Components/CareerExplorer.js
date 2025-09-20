import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CareerExplorer.css';

const CareerExplorer = () => {
  const [view, setView] = useState('list');
  // eslint-disable-next-line
  const [careerCode, setCareerCode] = useState('');
  // eslint-disable-next-line
  const [activeTab, setActiveTab] = useState('curriculum');
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const params = useParams();


  // All 35 career data
  const careers = [
    {
      id: 1,
      slug: 'accountant',
      title: 'Accountant',
      description: 'An accountant is a trusted financial expert who manages money, keeps accurate records, and prepares reports that guide important decisions. They ensure that businesses and individuals stay financially healthy.',
      fullDescription: 'An accountant is a trusted financial expert who manages money, keeps accurate records, and prepares reports that guide important decisions. They ensure that businesses and individuals stay financially healthy. They work in financial institutions such as banks, insurance companies, and SACCOs, as well as in corporations, government agencies, and auditing firms.',
      cta: 'To gain a clearer picture of the accountant career, including the studies, schools, skills employers look for, opportunities ahead etc., sign up for our full career course. Get structured details, expert support, and practical tools to shape your future.'
    },
    {
      id: 2,
      slug: 'actor-actress',
      title: 'Actor/Actress',
      description: 'An actor or actress is a creative performer who brings stories to life on stage, in films, or on television. Through their talent, they entertain, educate, and inspire audiences.',
      fullDescription: 'An actor or actress is a creative performer who brings stories to life on stage, in films, or on television. Through their talent, they entertain, educate, and inspire audiences. They can work in theatre productions, film and television companies, and advertising agencies, or even run their own media channels.',
      cta: 'Would you like to gain a complete picture of the journey of becoming an actor or actress? Access our full course and get industry exposure, information about the training required, creative skills needed, practical tools to shape your future etc. Get started now and step confidently into your acting career!'
    },
    {
      id: 3,
      slug: 'aeronautical-engineer',
      title: 'Aeronautical Engineer',
      description: 'An aeronautical engineer designs, develops, and maintains aircraft and spacecraft. They combine science, technology, and creativity to make aviation safer and more efficient.',
      fullDescription: 'An aeronautical engineer designs, develops, and maintains aircraft and spacecraft. They combine science, technology, and creativity to make aviation safer and more efficient. They can work in airlines, aircraft manufacturing companies, and aerospace research organizations.',
      cta: 'There is a lot more to discover on what it takes to become an aeronautical engineer. Learn about the studies required, schools offering it, the technical skills needed, the exciting opportunities in the field etc., by enrolling for our full career course. Step confidently into your aeronautical engineering career!'
    },
    {
      id: 4,
      slug: 'architect',
      title: 'Architect',
      description: 'An architect is a visionary designer who transforms ideas into beautiful, safe, and functional buildings. They plan and oversee construction projects that shape the world around us.',
      fullDescription: 'An architect is a visionary designer who transforms ideas into beautiful, safe, and functional buildings. They plan and oversee construction projects that shape the world around us. They work in architectural firms, construction companies, and real estate development organizations.',
      cta: 'To gain a full picture of what it takes to become an architect, including the studies required, the creative and technical skills you\'ll learn, the real journey of professionals in the field etc., sign up for our full career education course. Get structured learning, expert support, and practical tools to shape your future.'
    },
    {
      id: 5,
      slug: 'artist',
      title: 'Artist',
      description: 'An artist uses creativity and imagination to express ideas, emotions, and culture through painting, sculpture, content creation or other forms of art.',
      fullDescription: 'An artist uses creativity and imagination to express ideas, emotions, and culture through painting, sculpture, content creation or other forms of art. They inspire society and preserve heritage through their work. Artists can work in art galleries, schools and universities, and creative studios or agencies.',
      cta: 'Would you like to gain a clearer picture of what it is like to be an artist, including the training required, skills to grow your creativity, opportunities etc.? With our full career course, you\'ll get structured learning, real life exposure and leads to point you in the right direction. Enroll now and step confidently into your artistic career!'
    },
    {
      id: 6,
      slug: 'author-writer',
      title: 'Author/Writer',
      description: 'An author or writer is a storyteller who informs, educates, or entertains through words. They can write books, articles, scripts, or online content that reach audiences everywhere.',
      fullDescription: 'An author or writer is a storyteller who informs, educates, or entertains through words. They can write books, articles, scripts, or online content that reach audiences everywhere. Writers can work in publishing houses, media companies, and advertising or content creation agencies.',
      cta: 'Would you like to gain a clearer picture of what it takes to become a writer, including the education required, the skills to refine your craft, and the opportunities in publishing and media? With our full career course, you get well researched information and career exposure to shape your future. Enroll now and step confidently into your writing career!'
    },
    {
      id: 7,
      slug: 'banker',
      title: 'Banker',
      description: 'A banker is a financial professional who helps people and organizations manage money, save, borrow, and invest wisely. They are key to economic growth and stability.',
      fullDescription: 'A banker is a financial professional who helps people and organizations manage money, save, borrow, and invest wisely. They are key to economic growth and stability. Bankers can work in commercial banks, microfinance institutions, insurance companies, SACCOs, etc.',
      cta: 'Get a breakdown of this career path including the studies required, the financial skills you\'ll need, inspiration from people making it big in the sector etc. with our full career education course. Enroll now and step confidently into your banking career!'
    },
    {
      id: 8,
      slug: 'businessperson-entrepreneur',
      title: 'Businessperson/Entrepreneur',
      description: 'An entrepreneur is an innovator who turns ideas into successful businesses. They take risks, create opportunities, and provide jobs while solving real-life problems.',
      fullDescription: 'An entrepreneur is an innovator who turns ideas into successful businesses. They take risks, create opportunities, and provide jobs while solving real-life problems. Entrepreneurs can work in technology companies, retail and fashion businesses, and agribusiness enterprises. They can also start ventures in hospitality, e-commerce etc.',
      cta: 'Gain a clearer picture of becoming an entrepreneur, including the knowledge required, the leadership skills you\'ll need, the journey of great business men that started small etc., with our full career education course. Access structured learning, expert support, and practical tools to guide you into a bright entrepreneurial future.'
    },
    {
      id: 9,
      slug: 'chef',
      title: 'Chef',
      description: 'A chef is a master of flavors who blends creativity, skill, and passion to craft memorable meals. They design menus, lead kitchen teams, and make dining a delightful experience.',
      fullDescription: 'A chef is a master of flavors who blends creativity, skill, and passion to craft memorable meals. They design menus, lead kitchen teams, and make dining a delightful experience. They can work in hotels and resorts, restaurants and catering companies, and cruise ships or airlines.',
      cta: 'Learn more about what it takes to be an exceptional chef, with inspirations from celebrity chefs and their journeys. Get structured learning, expert support, and practical tools to direct you in the right path to your future. Enroll for our full career education course and step confidently into your culinary career!'
    },
    {
      id: 10,
      slug: 'civil-engineer',
      title: 'Civil Engineer',
      description: 'A civil engineer designs, builds, and maintains essential infrastructure such as roads, bridges, dams, and buildings. They turn plans into reality, improving how people live and connect.',
      fullDescription: 'A civil engineer designs, builds, and maintains essential infrastructure such as roads, bridges, dams, and buildings. They turn plans into reality, improving how people live and connect. Civil engineers can work in construction firms, government infrastructure projects, and engineering consultancies.',
      cta: 'In order to know exactly what it takes to become a civil engineer, including the educational pathway, the skills you will learn, opportunities in infrastructure development etc. join our full career education course. Access structured learning, expert support, and real life exposure that will shape your future. Enroll now!'
    },
    {
      id: 11,
      slug: 'customer-care-representative',
      title: 'Customer Care Representative',
      description: 'A customer care representative is the friendly voice that listens to customers, solves problems, and ensures satisfaction. They build trust between businesses and clients.',
      fullDescription: 'A customer care representative is the friendly voice that listens to customers, solves problems, and ensures satisfaction. They build trust between businesses and clients. They can work in call centres, telecommunications companies, and financial service providers.',
      cta: 'Curious about what it really takes to thrive as a customer care representative, from communication skills to training required, and the wide range of industries you can work in? With our full course, you\'ll get structured learning, career path guidance, and practical tools to shape your future. Enroll now and step confidently into your customer care career!'
    },
    {
      id: 12,
      slug: 'doctor',
      title: 'Doctor',
      description: 'A doctor is a lifesaver who diagnoses, treats, and prevents illnesses to keep people healthy. They combine science with compassion to restore lives.',
      fullDescription: 'A doctor is a lifesaver who diagnoses, treats, and prevents illnesses to keep people healthy. They combine science with compassion to restore lives. Doctors can work in hospitals, clinics, and health research institutions, as well as in humanitarian and international health organizations.',
      cta: 'Ever wondered how it really is like to be a doctor? The education, the hands-on experience, the opportunities in healthcare and research etc.? With our full career education course, we\'ve got you covered. Enroll now and step confidently into your medical career!'
    },
    {
      id: 13,
      slug: 'electrical-engineer',
      title: 'Electrical Engineer',
      description: 'An electrical engineer designs and maintains systems that power our modern world, from household wiring to advanced communication networks. They ensure reliable access to energy and technology.',
      fullDescription: 'An electrical engineer designs and maintains systems that power our modern world, from household wiring to advanced communication networks. They ensure reliable access to energy and technology. Electrical engineers can work in manufacturing industries, energy companies, and telecommunication firms.',
      cta: 'Interested in exploring what it takes and how it really is like to be an electrical engineer? Our full career education course covers the educational path you need to go through, the technical and problem-solving skills required, real life examples from thriving professionals and much more. Enroll now and step confidently into your electrical engineering career!'
    },
    {
      id: 14,
      slug: 'electrician',
      title: 'Electrician',
      description: 'An electrician installs, repairs, and maintains electrical systems, ensuring that homes, businesses, and industries run smoothly. They bring light and safety to daily life.',
      fullDescription: 'An electrician installs, repairs, and maintains electrical systems, ensuring that homes, businesses, and industries run smoothly. They bring light and safety to daily life. Electricians can work in construction projects, maintenance services, and manufacturing plants.',
      cta: 'Curious about the pathway to becoming an electrician — including the training path you\'ll need, the practical skills to master, industries where you can build your career etc? Enroll to our full course and get structured learning, real life exposure, and practical tools to shape your future. Gain clarity into your future electrical career!'
    },
    {
      id: 15,
      slug: 'environmental-engineer',
      title: 'Environmental Engineer',
      description: 'An environmental engineer develops solutions to protect the environment and promote sustainable living. They design systems that manage waste, control pollution, and conserve resources.',
      fullDescription: 'An environmental engineer develops solutions to protect the environment and promote sustainable living. They design systems that manage waste, control pollution, and conserve resources. They can work in environmental agencies, consulting firms, and renewable energy companies.',
      cta: 'To learn more about the studies involved, the sustainability skills you\'ll need, subjects required etc. enroll in our full career course. You will get structured learning and guidance, career exposure, practical tools to shape your future etc. Sign up now and gain clarity into your environmental engineering career!'
    },
    {
      id: 16,
      slug: 'fashion-designer',
      title: 'Fashion Designer',
      description: 'A fashion designer is a creative visionary who turns fabrics into style. They set trends, design clothing, and make personal expression possible through fashion.',
      fullDescription: 'A fashion designer is a creative visionary who turns fabrics into style. They set trends, design clothing, and make personal expression possible through fashion. Fashion designers can work in fashion houses, retail companies, and media or advertising agencies.',
      cta: 'To explore the journey of a fashion designer from creative studies to trend-setting skills, and the exciting opportunities in fashion and media, enroll in our full career path course. You\'ll get structured learning, expert support, and practical tools to lead you in the right direction. Enroll now and step confidently into your fashion career!'
    },
    {
      id: 17,
      slug: 'geospatial-engineer',
      title: 'Geospatial Engineer',
      description: 'A geospatial engineer collects, analyzes, and interprets data about the earth\'s surface using maps, satellite images, and technology. They help in planning cities, managing land, and protecting the environment.',
      fullDescription: 'A geospatial engineer collects, analyzes, and interprets data about the earth\'s surface using maps, satellite images, and technology. They help in planning cities, managing land, and protecting the environment. They can work in surveying companies, government and private mapping agencies, and research institutions.',
      cta: 'Curious about the path to becoming a geospatial engineer ? Enroll in our full career course and get structured learning, guidance on career path, practical tools to shape your future etc. Enroll now and step confidently into your geospatial engineering career!'
    },
    {
      id: 18,
      slug: 'journalist-reporter',
      title: 'Journalist/Reporter',
      description: 'A journalist uncovers stories, investigates issues, and shares information that informs the public and shapes opinions. They give a voice to society.',
      fullDescription: 'A journalist uncovers stories, investigates issues, and shares information that informs the public and shapes opinions. They give a voice to society. Journalists can work in print media, television and radio stations, and digital media platforms.',
      cta: 'Wondered what a career in journalism is like? With our full career course, you\'ll get structured learning, career exposure, and practical tools to shape your future. Enroll now and step confidently into your journalism career!'
    },
    {
      id: 19,
      slug: 'judge',
      title: 'Judge',
      description: 'A judge is a guardian of justice who listens to cases and makes fair decisions based on the law. They ensure order, fairness, and the protection of rights.',
      fullDescription: 'A judge is a guardian of justice who listens to cases and makes fair decisions based on the law. They ensure order, fairness, and the protection of rights. Judges can work in law courts, judicial systems, and legal training institutions.',
      cta: 'Interested in exploring what it takes to become a judge — the legal education required, the critical decision-making skills you need, and exposure to how the judicial system work? With our full course, you will get structured learning, career exposure, and practical tools to direct you to your future career. Register now and step confidently into your judicial career!'
    },
    {
      id: 20,
      slug: 'lawyer-advocate',
      title: 'Lawyer/Advocate',
      description: 'A lawyer advises clients, interprets laws, and represents people in court. They are defenders of rights and champions of justice.',
      fullDescription: 'A lawyer advises clients, interprets laws, and represents people in court. They are defenders of rights and champions of justice. Lawyers can work in law firms, corporate legal departments, and non-governmental organizations (NGOs).',
      cta: 'Are you considering building a career in law? With our full career education course, gain access to the details on the career path, grades and skills needed, schools you can join and real life experiences of current lawyers. Enroll now and get practical tools to shape your future.'
    },
    {
      id: 21,
      slug: 'lecturer-professor',
      title: 'Lecturer/Professor',
      description: 'A lecturer or professor is an educator who teaches at higher learning institutions and conducts research that advances knowledge. They inspire the next generation of professionals.',
      fullDescription: 'A lecturer or professor is an educator who teaches at higher learning institutions and conducts research that advances knowledge. They inspire the next generation of professionals. They can work in universities, research institutes, and training colleges.',
      cta: 'To gain a deeper knowledge of what it takes to become a lecturer or professor, register for our full career course. Access expert support, and practical tools to guide you in the right direction. Enroll now and step confidently into your academic career!'
    },
    {
      id: 22,
      slug: 'librarian',
      title: 'Librarian',
      description: 'A librarian manages information and helps people access knowledge through books, journals, and digital resources. They preserve learning and promote literacy.',
      fullDescription: 'A librarian manages information and helps people access knowledge through books, journals, and digital resources. They preserve learning and promote literacy. Librarians can work in schools and universities, public libraries, and research institutions.',
      cta: 'Curious about the path to becoming a librarian including the education required, the skills to master, the reality of being in the profession etc.? With our full career course, you\'ll get structured learning, career exposure, and practical tools to shape your future. Sign up now and step confidently into your library and information career!'
    },
    {
      id: 23,
      slug: 'mechanical-engineer',
      title: 'Mechanical Engineer',
      description: 'A mechanical engineer designs and builds machines and devices that make life easier — from engines to manufacturing equipment. They turn ideas into tools that power progress.',
      fullDescription: 'A mechanical engineer designs and builds machines and devices that make life easier — from engines to manufacturing equipment. They turn ideas into tools that power progress. They can work in automotive industries, manufacturing plants, and energy companies.',
      cta: 'Are you interested in uncovering what it takes to become a mechanical engineer — from technical studies, skills needed, the career path ahead of you etc.? With our full career course, you\'ll get structured guidance, career exposure, and practical tools to give you clarity. Enroll now and step confidently into your mechanical engineering career!'
    },
    {
      id: 24,
      slug: 'model',
      title: 'Model',
      description: 'A model showcases fashion, products, or concepts through photography and live presentations. They bring creativity and confidence to the fashion and advertising world.',
      fullDescription: 'A model showcases fashion, products, or concepts through photography and live presentations. They bring creativity and confidence to the fashion and advertising world. Models can work in fashion shows, advertising agencies, and media production companies.',
      cta: 'To learn more about what it takes to succeed as a model — from the steps in professional training to the skills you must have etc., enroll in our full career path education. Get structured guidance and practical tools to shape your future. Enroll now.'
    },
    {
      id: 25,
      slug: 'musician-singer',
      title: 'Musician/Singer',
      description: 'A musician creates and performs music that entertains, inspires, and brings people together. Through sound, they communicate emotions and stories.',
      fullDescription: 'A musician creates and performs music that entertains, inspires, and brings people together. Through sound, they communicate emotions and stories. Musicians can work in recording studios, live performance venues, and media companies.',
      cta: 'Curious about pursuing music as a career — the training involved, the creativity and performance skills to master, and the opportunities in entertainment and media? With a full course, you\'ll get structured learning, expert support, and practical tools to shape your future. Enroll now and step confidently into your music career!'
    },
    {
      id: 26,
      slug: 'nurse',
      title: 'Nurse',
      description: 'A nurse provides compassionate care to patients, supports doctors, and promotes health and recovery. They are the heart of healthcare.',
      fullDescription: 'A nurse provides compassionate care to patients, supports doctors, and promotes health and recovery. They are the heart of healthcare. Nurses can work directly with patients in hospitals, community health centres, and humanitarian organizations. They can also work in research in universities, medical research institutions, and hospitals.',
      cta: 'Interested in discovering what it takes to become a nurse — from the education path to clinical skills, and the wide opportunities in healthcare and research? With a full course, you\'ll get structured learning, expert support, and practical tools to shape your future. Enroll now and step confidently into your nursing career!'
    },
    {
      id: 27,
      slug: 'pharmacist',
      title: 'Pharmacist',
      description: 'A pharmacist is a healthcare professional who specializes in medicines and how they affect the human body. They make sure patients receive the right medicine, in the right dose, and understand exactly how to use it safely.',
      fullDescription: 'A pharmacist is a healthcare professional who specializes in medicines and how they affect the human body. They make sure patients receive the right medicine, in the right dose, and understand exactly how to use it safely. Pharmacists are trusted advisors who explain side effects, guide people on drug interactions, and sometimes even recommend over-the-counter treatments. In addition, pharmacists contribute to research and development, working on new medicines that save lives and improve quality of life. They can work in hospitals, in community pharmacies and in pharmaceutical companies.',
      cta: 'Ever thought about becoming a pharmacist — the education required, the science behind medicine, and the rewarding opportunities in healthcare and research? With a full course, you\'ll get structured learning, expert support, and practical tools to shape your future. Enroll now and step confidently into your pharmacy career!'
    },
    {
      id: 28,
      slug: 'photographer',
      title: 'Photographer',
      description: 'A photographer is a visual storyteller who captures moments, emotions, and beauty through the lens of a camera. They use creativity, lighting, and composition to create powerful images.',
      fullDescription: 'A photographer is a visual storyteller who captures moments, emotions, and beauty through the lens of a camera. They use creativity, lighting, and composition to create powerful images that can inspire, educate, or move people. Photography is both an art and a profession — it preserves personal milestones like weddings and graduations, documents history through journalism, and showcases the world\'s beauty through fashion, nature, and travel photography. Photographers can work in media houses, creative studios and event companies.',
      cta: 'Curious about how to build a career in photography — the technical skills to learn, the creative artistry to develop, and the opportunities in media and events? With a full course, you\'ll get structured learning, expert support, and practical tools to shape your future. Enroll now and step confidently into your photography career!'
    },
    {
      id: 29,
      slug: 'pilot',
      title: 'Pilot',
      description: 'A pilot is a highly trained professional who commands aircraft, ensuring safe and efficient travel for passengers and goods across the skies.',
      fullDescription: 'A pilot is a highly trained professional who commands aircraft, ensuring safe and efficient travel for passengers and goods across the skies. Beyond operating the plane, pilots are responsible for making quick, critical decisions, navigating complex weather conditions, and working closely with flight crews to guarantee safety. They can work in commercial airlines, cargo transport companies, and military aviation units.',
      cta: 'Interested in what it takes to become a pilot — the education path, the technical training required, and the wide career opportunities in commercial, cargo, and military aviation? With a full course, you\'ll get structured learning, expert support, and practical tools to shape your future. Enroll now and step confidently into your aviation career!'
    },
    {
      id: 30,
      slug: 'police-officer',
      title: 'Police Officer',
      description: 'A police officer is a protector of society who maintains peace, prevents crime, and safeguards lives and property.',
      fullDescription: 'A police officer is a protector of society who maintains peace, prevents crime, and safeguards lives and property. Their work involves enforcing laws, investigating cases, and responding to emergencies. Police officers are symbols of courage and order, standing at the frontline to ensure justice and safety in the community. They can work in law enforcement agencies, traffic departments, and community policing units.',
      cta: 'Ever wondered about the journey to becoming a police officer — the training required, the leadership and communication skills to develop, and the rewarding opportunities in law enforcement? With a full course, you\'ll get structured learning, expert support, and practical tools to shape your future. Enroll now and step confidently into your policing career!'
    },
    {
      id: 31,
      slug: 'politician',
      title: 'Politician',
      description: 'A politician is a leader chosen to represent citizens, create policies, and guide national or community development.',
      fullDescription: 'A politician is a leader chosen to represent citizens, create policies, and guide national or community development. They shape the future by making decisions that impact education, healthcare, infrastructure, and the economy. Visionary politicians inspire trust, unite people, and speak up for the needs of society. They can work in government institutions, political organizations, and international bodies.',
      cta: 'Thinking about what it takes to become a politician — the education path, the leadership skills to sharpen, and the wide opportunities in government and international organizations? With a full course, you\'ll get structured learning, expert support, and practical tools to shape your future. Enroll now and step confidently into your political career!'
    },
    {
      id: 32,
      slug: 'radio-presenter',
      title: 'Radio Presenter',
      description: 'A radio presenter is the lively voice behind the microphone who entertains, informs, and connects with listeners.',
      fullDescription: 'A radio presenter is the lively voice behind the microphone who entertains, informs, and connects with listeners. They use their personality, creativity, and communication skills to make broadcasts engaging and memorable. Radio presenters can influence culture, promote talent, and bring people together through storytelling, music, and discussion. They can work in radio stations, advertising companies, and event hosting organizations.',
      cta: 'Curious about what it takes to thrive as a radio presenter — from communication training to creativity and media skills, and the many opportunities in broadcasting and entertainment? With a full course, you\'ll get structured learning, expert support, and practical tools to shape your future. Enroll now and step confidently into your media career!'
    },
    {
      id: 33,
      slug: 'receptionist',
      title: 'Receptionist',
      description: 'A receptionist is the welcoming face and voice of an organization. They greet visitors warmly, handle communication, and organize schedules, ensuring that everything runs smoothly.',
      fullDescription: 'A receptionist is the welcoming face and voice of an organization. They greet visitors warmly, handle communication, and organize schedules, ensuring that everything runs smoothly. Receptionists create the first impression of a workplace, combining professionalism with friendliness. They can work in hotels, corporate offices, and educational institutions.',
      cta: 'Ever wondered what it takes to become a professional receptionist — the organizational skills, communication training, and career paths in offices, hotels, and institutions? With a full course, you\'ll get structured learning, expert support, and practical tools to shape your future. Enroll now and step confidently into your receptionist career!'
    },
    {
      id: 34,
      slug: 'social-worker',
      title: 'Social Worker',
      description: 'A social worker is a compassionate professional dedicated to helping individuals and communities overcome challenges.',
      fullDescription: 'A social worker is a compassionate professional dedicated to helping individuals and communities overcome challenges. They support vulnerable groups such as children, the elderly, or people facing poverty and trauma. Social workers also advocate for justice and social change, improving the quality of life in society. They can work in non-governmental organizations, hospitals, and schools or community centres.',
      cta: 'Interested in discovering the journey to becoming a social worker — the education path, the empathy and advocacy skills to build, and the wide opportunities in NGOs, hospitals, and schools? With a full course, you\'ll get structured learning, expert support, and practical tools to shape your future. Enroll now and step confidently into your social work career!'
    },
    {
      id: 35,
      slug: 'soldier',
      title: 'Soldier',
      description: 'A soldier is a disciplined defender of a nation who serves in the armed forces to protect the country and its people.',
      fullDescription: 'A soldier is a disciplined defender of a nation who serves in the armed forces to protect the country and its people. Soldiers train rigorously, operate in difficult conditions, and demonstrate bravery in the face of danger. They are a symbol of courage, loyalty, and sacrifice. Soldiers can work in military defense forces, peacekeeping missions, and training academies.',
      cta: 'Thinking about a career as a soldier — the discipline required, the rigorous training, and the opportunities in defense, peacekeeping, and leadership? With a full course, you\'ll get structured learning, expert support, and practical tools to shape your future. Enroll now and step confidently into your military career!'
    },
    {
      id: 36,
      slug: 'teacher',
      title: 'Teacher',
      description: 'A teacher is a mentor and guide who shapes the minds and character of students. They not only pass on knowledge but also inspire curiosity, build confidence, and nurture values that last a lifetime.',
      fullDescription: 'A teacher is a mentor and guide who shapes the minds and character of students. They not only pass on knowledge but also inspire curiosity, build confidence, and nurture values that last a lifetime. Teachers influence future leaders, professionals, and innovators, making their role one of the most impactful in society. They can work in primary schools, secondary schools, and training centres.',
      cta: 'Discover what it takes to become a teacher — from the education path to classroom skills, and the many rewarding opportunities in schools and training centres etc. With our full career course, you\'ll get structured learning, expert support, and practical tools to shape your future. Sign up now and step into your teaching career with clarity!'
    },
    {
      id: 37,
      slug: 'veterinarian-vet',
      title: 'Veterinarian (Vet)',
      description: 'A veterinarian is a dedicated animal health professional who diagnoses diseases, treats injuries, and promotes the well-being of pets, farm animals, and wildlife.',
      fullDescription: 'A veterinarian is a dedicated animal health professional who diagnoses diseases, treats injuries, and promotes the well-being of pets, farm animals, and wildlife. They also play an important role in protecting human health by controlling animal-borne diseases. Vets are compassionate healers and guardians of animal life. They can work in animal clinics, farms, and wildlife conservation centres.',
      cta: 'Ever thought about how it is like to become a veterinarian? The studies required, the compassion and medical expertise to develop, and the exciting opportunities in clinics, farms, and conservation as well as real life guidance from experts? With our full course, you\'ll get structured learning, expert support, and practical tools to shape your future. Enroll now and step confidently into your veterinary career!'
    }
  ];

  // Check if we're viewing a detail page based on URL params
  useEffect(() => {
    if (params.slug) {
      const career = careers.find(c => c.slug === params.slug);
      if (career) {
        setSelectedCareer(career);
        setView('detail');
      } else {
        navigate('/careers');
      }
    } else {
      setView('list');
    }
  },
  // eslint-disable-next-line
  [params.slug, navigate]);

  const handleLearnMore = (slug) => {
    navigate(`/career/${slug}`);
  };

  const handleBackToList = () => {
    navigate('/careers');
  };
  
  // eslint-disable-next-line
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Career code submitted:', careerCode);
  };

  const handleGetStarted = () => {
    navigate('/payment', { state: { career: selectedCareer } });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter careers based on search term
  const filteredCareers = careers.filter(career => 
    career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    career.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render the list view (CareerPage)
  if (view === 'list') {
    return (
      <div className="career-explorer">
        <div className="career-page">
          <header className="career-header">
            <h1>Explore Career Paths</h1>
            <p className="subtitle">
              Each program offers a detailed breakdown of what the career is all about, from education to employment, with practical tools to shape your future.
            </p>

            <div className="search-container">
              <input
                type="text"
                placeholder="Search for careers..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="career-search"
                aria-label="Search for careers"
              />
              {searchTerm && (
                <button 
                  className="clear-search" 
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </header>

          {filteredCareers.length === 0 ? (
            <div className="no-results">
              <h2>No careers found</h2>
              <p>Try adjusting your search terms or explore our full catalog.</p>
              <button 
                className="reset-search-btn"
                onClick={() => setSearchTerm('')}
                aria-label="Reset search"
              >
                View All Careers
              </button>
            </div>
          ) : (
            <div className="career-grid">
              {filteredCareers.map(career => (
                <div key={career.id} className="career-card">
                  <h2>{career.title}</h2>
                  <button 
                    className="learn-more-btn"
                    onClick={() => handleLearnMore(career.slug)}
                    aria-label={`Learn more about ${career.title} career`}
                  >
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Render the detail view (CareerDetail)
  if (view === 'detail' && selectedCareer) {
    return (
      <div className="career-explorer">
        <div className="career-detail">
          <button className="back-button" onClick={handleBackToList}>
            &larr; Back to Careers
          </button>
          
          <header className="detail-header">
            <h1>{selectedCareer.title}</h1>
            <p className="career-overview">{selectedCareer.fullDescription}</p>
            <p className="career-full-cta">{selectedCareer.cta}</p>
          </header>

          <div className="divider"></div>

          <main className="detail-content">
            {/* Education Tabs 
            <section className="career-education">
              <div className="tabs">
                <button 
                  className={`tab ${activeTab === 'curriculum' ? 'active' : ''}`}
                  onClick={() => setActiveTab('curriculum')}
                >
                  Curriculum
                </button>
                <button 
                  className={`tab ${activeTab === 'resources' ? 'active' : ''}`}
                  onClick={() => setActiveTab('resources')}
                >
                  Resources
                </button>
                <button 
                  className={`tab ${activeTab === 'pathways' ? 'active' : ''}`}
                  onClick={() => setActiveTab('pathways')}
                >
                  Pathways
                </button>
              </div>
              
              <div className="content-area">
                {activeTab === 'curriculum' && (
                  <div className="tab-content">
                    <h3>Recommended Learning Path for {selectedCareer.title}</h3>
                    <ul className="curriculum-list">
                      <li>Foundation Courses</li>
                      <li>Specialization Modules</li>
                      <li>Practical Projects</li>
                      <li>Industry Certifications</li>
                    </ul>
                    <p>Detailed curriculum for {selectedCareer.title} shows here.</p>
                  </div>
                )}
                {activeTab === 'resources' && (
                  <div className="tab-content">
                    <h3>Learning Resources for {selectedCareer.title}</h3>
                    <p>Books, online courses, and materials specific to {selectedCareer.title} will be listed here.</p>
                  </div>
                )}
                {activeTab === 'pathways' && (
                  <div className="tab-content">
                    <h3>Career Pathways for {selectedCareer.title}</h3>
                    <p>Potential career trajectories and advancement opportunities in {selectedCareer.title}.</p>
                  </div>
                )}
              </div>
            </section> */}

            <div className="get-started-section">
              <button className="get-started-btn" onClick={handleGetStarted}>
                Get Started
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Fallback if career not found
  return (
    <div className="error-page">
      <h2>Career not found</h2>
      <button onClick={handleBackToList}>Back to Careers</button>
    </div>
  );
};

export default CareerExplorer;