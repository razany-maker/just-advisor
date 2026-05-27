import { useState, useCallback } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  MarkerType,
  Position
} from "@xyflow/react";
import { X, BookOpen, Clock, Zap, Star, Building, BarChart3, Youtube, Book, Library } from "lucide-react";

// Colors for the 4 years
const blue = "#3B82F6";
const pink = "#EC4899";
const purple = "#8B5CF6";
const red = "#EF4444";

const deptFullNames: Record<string, string> = {
  CS: "Computer Science",
  SE: "Software Engineering",
  CIS: "Computer Information Systems",
  CPE: "Computer Engineering",
  MATH: "Mathematics",
  PHYS: "Physics",
  CYB: "Cybersecurity",
  UNIV: "University Requirements",
};

const getStyle = (color: string) => ({
  background: "#FFFFFF",
  border: `5px solid ${color}`,
  borderRadius: "16px",
  fontWeight: "900",
  color: "#1F2D4D",
  padding: "16px 20px",
  boxShadow: `0 10px 15px -3px ${color}33`,
  width: 240,
  textAlign: "center" as const
});

// Map of all 48 courses, precisely 12 per year
const courseData = [
  // Year 1 (Blue)
  { id: "M101", label: "Calculus 1", dept: "MATH", year: 1, row: 0, col: 0, desc: "Limits, continuity, derivatives, and basic integration." },
  { id: "CS111", label: "Introduction To Programming", dept: "CS", year: 1, row: 0, col: 1, desc: "Fundamental programming concepts and problem-solving using C++." },
  { id: "SE100", label: "Introduction To Information Technology", dept: "SE", year: 1, row: 0, col: 2, desc: "Overview of computer hardware, software, networks, and IT concepts." },
  { id: "U1", label: "University Compulsory Requisite 1", dept: "UNIV", year: 1, row: 0, col: 3, desc: "General university-mandated subject." },
  { id: "U2", label: "University Compulsory Requisite 2", dept: "UNIV", year: 1, row: 0, col: 4, desc: "General university-mandated subject." },
  { id: "P1", label: "General Physics (1)", dept: "PHYS", year: 1, row: 0, col: 5, desc: "Classical mechanics including kinematics, dynamics, and energy." },

  { id: "M102", label: "Calculus 2", dept: "MATH", year: 1, row: 1, col: 0, desc: "Techniques of integration, sequences, and infinite series." },
  { id: "SE112", label: "Introduction To Object-Oriented Programming", dept: "SE", year: 1, row: 1, col: 1, desc: "Object-oriented programming principles such as classes, inheritance, and polymorphism." },
  { id: "M201", label: "Discrete Mathematics", dept: "MATH", year: 1, row: 1, col: 2, desc: "Logic, sets, functions, relations, and introductory graph theory." },
  { id: "P102", label: "General Physics (2)", dept: "PHYS", year: 1, row: 1, col: 3, desc: "Electricity, magnetism, and basic electromagnetism concepts." },
  { id: "P103", label: "General Physics (Laboratory)(2)", dept: "PHYS", year: 1, row: 1, col: 4, desc: "Practical experiments verifying electromagnetism principles." },
  { id: "U3", label: "University Compulsory Requisite 3", dept: "UNIV", year: 1, row: 1, col: 5, desc: "General university-mandated subject." },

  // Year 2 (Pink)
  { id: "CS211", label: "Data Structures", dept: "CS", year: 2, row: 2, col: 0, desc: "Study of arrays, lists, stacks, queues, trees, and graphs." },
  { id: "CIS200", label: "Introduction To Web Design", dept: "CIS", year: 2, row: 2, col: 1, desc: "Basics of HTML, CSS, and interactive web interfaces." },
  { id: "CPE200", label: "Digital Logic Design", dept: "CPE", year: 2, row: 2, col: 2, desc: "Boolean algebra, combinational and sequential logic circuits." },
  { id: "M203", label: "Elements Of Linear Algebra", dept: "MATH", year: 2, row: 2, col: 3, desc: "Matrices, determinants, vector spaces, and linear transformations." },
  { id: "CIS201", label: "Communication And Professional Ethics", dept: "CIS", year: 2, row: 2, col: 4, desc: "Ethical frameworks and communication skills in the tech industry." },
  { id: "U4", label: "University Compulsory Requisite 4", dept: "UNIV", year: 2, row: 2, col: 5, desc: "General university-mandated subject." },

  { id: "CS284", label: "Analysis And Design Of Algorithms", dept: "CS", year: 2, row: 3, col: 0, desc: "Algorithm efficiency, sorting, searching, and dynamic programming." },
  { id: "CS212", label: "Object-Oriented Software Modeling Lab", dept: "CS", year: 2, row: 3, col: 1, desc: "Hands-on modeling and design of object-oriented systems." },
  { id: "CIS221", label: "Fundamentals Of Database Systems", dept: "CIS", year: 2, row: 3, col: 2, desc: "Relational models, SQL, and database design." },
  { id: "CS281", label: "Theory Of Computing", dept: "CS", year: 2, row: 3, col: 3, desc: "Automata theory, formal languages, and Turing machines." },
  { id: "M233", label: "Probability & Statistics (For Computer Sciences Students)", dept: "MATH", year: 2, row: 3, col: 4, desc: "Statistical methods and probability theories for computational applications." },
  { id: "U5", label: "University Compulsory Requisite 5", dept: "UNIV", year: 2, row: 3, col: 5, desc: "General university-mandated subject." },

  // Year 3 (Purple)
  { id: "SE300", label: "Fundamentals Of Software Engineering", dept: "SE", year: 3, row: 4, col: 0, desc: "Software lifecycle, requirement analysis, design, and testing." },
  { id: "CS311", label: "Operating Systems", dept: "CS", year: 3, row: 4, col: 1, desc: "Process management, memory management, and file systems." },
  { id: "CPE300", label: "Computer Organization And Design", dept: "CPE", year: 3, row: 4, col: 2, desc: "Internal computer architecture and instruction set execution." },
  { id: "CS342", label: "Computer Networks", dept: "CS", year: 3, row: 4, col: 3, desc: "Network protocols, OSI model, and TCP/IP architecture." },
  { id: "CIS300", label: "Fundamentals Of Multimedia", dept: "CIS", year: 3, row: 4, col: 4, desc: "Processing and representation of audio, image, and video data." },
  { id: "U6", label: "University Elective 1", dept: "UNIV", year: 3, row: 4, col: 5, desc: "Student's choice from university-approved electives." },

  { id: "SE301", label: "System Analysis And Design", dept: "SE", year: 3, row: 5, col: 0, desc: "Methodologies for analyzing and designing complex software systems." },
  { id: "CS376", label: "Artificial Intelligence", dept: "CS", year: 3, row: 5, col: 1, desc: "Search algorithms, knowledge representation, and intelligent agents." },
  { id: "CS318", label: "Human-Computer Interaction", dept: "CS", year: 3, row: 5, col: 2, desc: "Principles of designing user-friendly interfaces and UX evaluation." },
  { id: "CPE201", label: "Digital Logic Design Lab", dept: "CPE", year: 3, row: 5, col: 3, desc: "Practical hardware implementation of logic circuits." },
  { id: "F1", label: "Free Elective 1", dept: "UNIV", year: 3, row: 5, col: 4, desc: "Open elective course chosen by the student." },
  { id: "F2", label: "Free Elective 2", dept: "UNIV", year: 3, row: 5, col: 5, desc: "Open elective course chosen by the student." },

  // Year 4 (Red)
  { id: "CS491", label: "Graduation Project 1", dept: "CS", year: 4, row: 6, col: 0, desc: "Proposal, requirement analysis, and initial design for the capstone project." },
  { id: "CS420", label: "Computer Architecture", dept: "CS", year: 4, row: 6, col: 1, desc: "Advanced processor design, pipelining, and memory hierarchies." },
  { id: "CS450", label: "Distributed Computer Systems", dept: "CS", year: 4, row: 6, col: 2, desc: "Concepts of distributed networks, concurrency, and fault tolerance." },
  { id: "CS442", label: "Wireless Networks", dept: "CS", year: 4, row: 6, col: 3, desc: "Wireless communication principles and mobile network architectures." },
  { id: "CS460", label: "Web Applications Development", dept: "CS", year: 4, row: 6, col: 4, desc: "Full-stack development for modern, scalable web applications." },
  { id: "E1", label: "Elective Course 1", dept: "CS", year: 4, row: 6, col: 5, desc: "Specialized departmental elective course." },

  { id: "CS492", label: "Graduation Project 2", dept: "CS", year: 4, row: 7, col: 0, desc: "Implementation, testing, and final defense of the capstone project." },
  { id: "CYB400", label: "Cryptography", dept: "CYB", year: 4, row: 7, col: 1, desc: "Encryption algorithms, secure communication, and data protection." },
  { id: "CS480", label: "Computational Biology", dept: "CS", year: 4, row: 7, col: 2, desc: "Algorithmic applications in biological data and bioinformatics." },
  { id: "PT", label: "Practical Training", dept: "CS", year: 4, row: 7, col: 3, desc: "Real-world industry internship and professional experience." },
  { id: "E2", label: "Elective Course 2", dept: "CS", year: 4, row: 7, col: 4, desc: "Specialized departmental elective course." },
  { id: "E3", label: "Elective Course 3", dept: "CS", year: 4, row: 7, col: 5, desc: "Specialized departmental elective course." },
];

const initialNodes: Node[] = courseData.map((c) => {
  let color = blue;
  if (c.year === 2) color = pink;
  if (c.year === 3) color = purple;
  if (c.year === 4) color = red;

  // Stagger the columns (brick pattern) to completely eliminate lines crossing straight through nodes
  const staggerOffset = c.row % 2 !== 0 ? 170 : 0;
  const x = c.col * 340 + staggerOffset + 50;
  
  // Add an extra vertical gap between years so horizontal routing fits beautifully in the gutters
  const yearGap = (c.year - 1) * 120;
  const y = c.row * 240 + yearGap + 50;

  return {
    id: c.id,
    position: { x, y },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    style: getStyle(color),
    data: {
      label: (
        <div className="flex flex-col items-center justify-center pointer-events-none w-full">
          <span className="text-[12px] font-black uppercase tracking-widest opacity-60 mb-1.5">{c.dept}</span>
          <span className="text-[14px] leading-tight text-[#1F2D4D] font-bold">{c.label}</span>
        </div>
      ),
      rawLabel: c.label,
      desc: c.desc,
      dept: c.dept,
      credits: c.label.includes('Lab') || c.label.includes('Laboratory') ? 1 : 3,
      difficulty: c.year > 2 ? "Hard" : "Medium",
      semester: "First / Second",
      grading: "Midterm Exam (50%), Final Exam (50%)",
      resources: ["Course Syllabus", "University Library"]
    }
  };
});

// Helper for Prerequisite Pass (سابق نجاح)
const passEdge = (id: string, source: string, target: string, color: string) => ({
  id, source, target,
  type: 'smoothstep',
  animated: true,
  style: { stroke: color, strokeWidth: 3 },
  markerEnd: { type: MarkerType.ArrowClosed, color: color }
});

// Helper for Prerequisite Study (سابق دراسة)
const studyEdge = (id: string, source: string, target: string, color: string) => ({
  id, source, target,
  type: 'smoothstep',
  animated: true,
  style: { stroke: color, strokeWidth: 3, strokeDasharray: '8 8' },
  markerEnd: { type: MarkerType.ArrowClosed, color: color }
});

const initialEdges: Edge[] = [
  passEdge('e1', 'M101', 'M102', blue),
  passEdge('e2', 'CS111', 'SE112', blue),
  passEdge('e3', 'M101', 'M201', blue),
  studyEdge('e4', 'P102', 'P103', blue),
  passEdge('e5', 'P1', 'P102', blue),
  
  passEdge('e6', 'SE112', 'CS211', pink),
  passEdge('e7', 'SE100', 'CIS200', pink),
  passEdge('e8', 'M101', 'M203', pink),
  studyEdge('e9', 'SE112', 'CS212', pink),
  passEdge('e10', 'CS211', 'CS284', pink),
  passEdge('e11', 'M201', 'CS281', pink),
  studyEdge('e12', 'CS111', 'CIS221', pink),
  passEdge('e13', 'M102', 'M233', pink),

  studyEdge('e14', 'CPE200', 'CPE201', purple),
  passEdge('e15', 'CPE200', 'CPE300', purple),
  passEdge('e16', 'CS211', 'SE300', purple),
  passEdge('e17', 'CS211', 'CS311', purple),
  studyEdge('e18', 'CS211', 'CS376', purple),
  passEdge('e19', 'CS284', 'CS376', purple),
  passEdge('e20', 'CS211', 'CS342', purple),
  studyEdge('e21', 'SE300', 'SE301', purple),

  passEdge('e22', 'CPE300', 'CS420', red),
  passEdge('e23', 'CS342', 'CS442', red),
  studyEdge('e24', 'CS311', 'CS450', red),
  passEdge('e25', 'CIS200', 'CS460', red),
  passEdge('e26', 'CS491', 'CS492', red),
];

export function CoursesTree() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedCourse(node.data);
  };

  return (
    <div className="h-full flex flex-col relative w-full rounded-[2rem] overflow-hidden bg-white/50">
      <div className="p-4 md:p-6 bg-white/40 backdrop-blur-md z-10 border-b border-white/50 relative overflow-hidden flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="absolute top-0 right-10 w-32 h-32 bg-[#D03028] rounded-full blur-3xl opacity-10 pointer-events-none"></div>
          <h1 className="text-3xl font-extrabold text-[#1F2D4D] flex items-center">
            Course Constellation <Star className="w-6 h-6 ml-3 text-yellow-400 fill-yellow-400" />
          </h1>
          <p className="text-[#263C74] font-bold mt-1">Explore all 48 courses, connected by their prerequisites!</p>
        </div>
        
        {/* Legends section */}
        <div className="flex flex-col gap-3">
          {/* Year Color Legend */}
          <div className="flex flex-wrap gap-2 bg-white/60 p-2.5 rounded-xl shadow-sm border border-white/50">
            <div className="flex items-center space-x-2"><span className="w-3 h-3 rounded-full bg-white border-[3px] border-[#3B82F6]"></span><span className="text-[11px] font-bold text-[#1F2D4D]">Year 1</span></div>
            <div className="flex items-center space-x-2 ml-2"><span className="w-3 h-3 rounded-full bg-white border-[3px] border-[#EC4899]"></span><span className="text-[11px] font-bold text-[#1F2D4D]">Year 2</span></div>
            <div className="flex items-center space-x-2 ml-2"><span className="w-3 h-3 rounded-full bg-white border-[3px] border-[#8B5CF6]"></span><span className="text-[11px] font-bold text-[#1F2D4D]">Year 3</span></div>
            <div className="flex items-center space-x-2 ml-2"><span className="w-3 h-3 rounded-full bg-white border-[3px] border-[#EF4444]"></span><span className="text-[11px] font-bold text-[#1F2D4D]">Year 4</span></div>
          </div>
          
          {/* Arrow Legend */}
          <div className="flex flex-wrap gap-4 bg-white/60 p-2.5 rounded-xl shadow-sm border border-white/50">
            <div className="flex items-center space-x-2">
              <div className="flex items-center w-8">
                <div className="w-full h-0.5 bg-[#1F2D4D]"></div>
                <div className="w-2 h-2 border-t-2 border-r-2 border-[#1F2D4D] rotate-45 -ml-1.5"></div>
              </div>
              <span className="text-[11px] font-bold text-[#1F2D4D]">سابق نجاح (Pass)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center w-8">
                <div className="w-full h-0 border-t-2 border-dashed border-[#1F2D4D]"></div>
                <div className="w-2 h-2 border-t-2 border-r-2 border-[#1F2D4D] rotate-45 -ml-1.5"></div>
              </div>
              <span className="text-[11px] font-bold text-[#1F2D4D]">سابق دراسة (Study)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 relative z-0">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
          attributionPosition="bottom-right"
          minZoom={0.1}
        >
          <Background color="#1F2D4D" gap={32} size={2} className="opacity-10" />
          <Controls className="bg-white border-2 border-[#E7ECF0] shadow-xl rounded-xl overflow-hidden fill-[#263C74]" />
        </ReactFlow>
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1F2D4D]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col overflow-hidden transform animate-in zoom-in-95 duration-300 border-4 border-white">
            
            {/* Modal Header */}
            <div className={`p-6 flex justify-between items-start text-white bg-gradient-to-br ${
              selectedCourse.difficulty.includes('Hard') ? 'from-[#D03028] to-[#9B231D]' : 'from-[#263C74] to-[#1F2D4D]'
            } shrink-0`}>
              <div>
                <span className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-3 backdrop-blur-md border border-white/30">
                  🗓️ Semester: {selectedCourse.semester}
                </span>
                <h3 className="font-extrabold text-xl flex items-start leading-tight">
                  <BookOpen className="w-6 h-6 mr-3 opacity-80 shrink-0 mt-0.5" />
                  {selectedCourse.rawLabel}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedCourse(null)}
                className="text-white bg-white/10 hover:bg-white/30 p-2 rounded-full transition-colors backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Scrollable Content */}
            <div className="p-8 overflow-y-auto space-y-6 flex-1 bg-white">
              
              {/* Dynamic one-line description */}
              {selectedCourse.desc && (
                <div className="bg-[#E7ECF0]/30 border-l-4 border-[#263C74] p-4 rounded-r-xl">
                  <p className="text-[#1F2D4D]/80 font-semibold text-sm leading-relaxed">
                    {selectedCourse.desc}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#E7ECF0]/50 p-4 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5 text-[#263C74]" />
                  </div>
                  <p className="text-[#1F2D4D]/60 font-bold text-xs uppercase tracking-wider mb-1">Credits</p>
                  <p className="font-extrabold text-[#1F2D4D] text-lg">{selectedCourse.credits} Hours</p>
                </div>
                
                <div className="bg-[#E7ECF0]/50 p-4 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3">
                    <Zap className={`w-5 h-5 ${selectedCourse.difficulty.includes('Hard') ? 'text-[#D03028]' : 'text-[#263C74]'}`} />
                  </div>
                  <p className="text-[#1F2D4D]/60 font-bold text-xs uppercase tracking-wider mb-1">Difficulty</p>
                  <p className={`font-extrabold text-lg ${
                    selectedCourse.difficulty.includes('Hard') ? 'text-[#D03028]' : 'text-[#263C74]'
                  }`}>
                    {selectedCourse.difficulty}
                  </p>
                </div>
              </div>

              {/* Advanced Academic Info Section */}
              <div className="space-y-5 pt-6 border-t border-gray-100">
                
                <div>
                  <h4 className="text-[#1F2D4D] font-extrabold text-sm uppercase tracking-wider flex items-center mb-2">
                    <Building className="w-4 h-4 mr-2 text-[#263C74]" />
                    Department
                  </h4>
                  <p className="text-[#1F2D4D]/80 font-semibold bg-[#E7ECF0]/40 p-3 rounded-xl">
                    {deptFullNames[selectedCourse.dept] || selectedCourse.dept}
                  </p>
                </div>

                <div>
                  <h4 className="text-[#1F2D4D] font-extrabold text-sm uppercase tracking-wider flex items-center mb-2">
                    <BarChart3 className="w-4 h-4 mr-2 text-[#263C74]" />
                    Grading Distribution
                  </h4>
                  <p className="text-[#1F2D4D]/80 font-semibold bg-[#E7ECF0]/40 p-3 rounded-xl leading-relaxed">
                    {selectedCourse.grading}
                  </p>
                </div>

                <div>
                  <h4 className="text-[#1F2D4D] font-extrabold text-sm uppercase tracking-wider flex items-center mb-2">
                    <Library className="w-4 h-4 mr-2 text-[#263C74]" />
                    Learning Resources
                  </h4>
                  <ul className="bg-[#E7ECF0]/40 p-4 rounded-xl space-y-3">
                    {selectedCourse.resources.map((res: string, idx: number) => {
                      const isYouTube = res.toLowerCase().includes('youtube');
                      const Icon = isYouTube ? Youtube : Book;
                      return (
                        <li key={idx} className="flex items-start">
                          <Icon className={`w-5 h-5 mr-3 mt-0.5 shrink-0 ${isYouTube ? 'text-[#D03028]' : 'text-[#263C74]'}`} />
                          <span className="text-[#1F2D4D]/80 font-semibold text-sm leading-relaxed">{res}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

              </div>

              <button 
                onClick={() => setSelectedCourse(null)}
                className={`w-full mt-4 py-4 px-6 text-white font-extrabold rounded-2xl transition-all hover:-translate-y-1 shadow-md hover:shadow-lg ${
                  selectedCourse.difficulty.includes('Hard') ? 'bg-[#D03028] hover:bg-[#9B231D]' : 'bg-[#263C74] hover:bg-[#1F2D4D]'
                }`}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
