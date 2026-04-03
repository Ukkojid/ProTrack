"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .page-404 {
          min-height: 100vh;
          background: #f5f5f3;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
        }

        .card-404 {
          background: #ffffff;
          border-radius: 28px;
          box-shadow: 0 10px 60px rgba(0,0,0,0.08);
          display: flex;
          max-width: 760px;
          width: calc(100% - 40px);
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px) scale(0.98);
          transition: all 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .card-404.show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .left-panel {
          width: 280px;
          background: linear-gradient(135deg, #ededf8, #e3e3ff);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 52px 28px;
        }

        .circle-bg {
          position: absolute;
          width: 190px;
          height: 190px;
          border-radius: 50%;
          background: #dcdcf5;
        }

        .right-panel {
          flex: 1;
          padding: 52px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .r-item {
          opacity: 0;
          transform: translateY(12px);
          transition: all 0.5s ease;
        }

        .card-404.show .r-item {
          opacity: 1;
          transform: translateY(0);
        }

        .tag {
          font-size: 11px;
          font-weight: 500;
          color: #6060b8;
          background: #e8e8f8;
          padding: 6px 14px;
          border-radius: 999px;
          display: inline-block;
          margin-bottom: 18px;
        }

        .h1-404 {
          font-family: 'Syne', sans-serif;
          font-size: 90px;
          font-weight: 800;
          color: #14143a;
          margin: 0;
        }

        .h2-404 {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          margin: 10px 0;
          color: #14143a;
        }

        .p-404 {
          font-size: 14px;
          color: #9898b0;
          margin-bottom: 30px;
        }

        .btns {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: #1e1e6a;
          color: #fff;
          padding: 12px 24px;
          border-radius: 999px;
          text-decoration: none;
          font-size: 13px;
          transition: 0.3s;
        }

        .btn-primary:hover {
          background: #2c2c8a;
          transform: translateY(-2px);
        }

        .btn-ghost {
          border: 1.5px solid #d0d0ec;
          padding: 11px 22px;
          border-radius: 999px;
          font-size: 13px;
          cursor: pointer;
          background: transparent;
          color: #6060b8;
        }

        .btn-ghost:hover {
          border-color: #6060b8;
        }

        /* Simple floating animation */
        .float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @media (max-width: 600px) {
          .card-404 {
            flex-direction: column;
          }
          .left-panel {
            width: 100%;
          }
        }
      `}</style>

      <div className="page-404">
        <div className={`card-404 ${ready ? "show" : ""}`}>

          {/* LEFT */}
          <div className="left-panel">
            <div className="circle-bg"></div>
            <div className="float text-6xl">⚡</div>
          </div>

          {/* RIGHT */}
          <div className="right-panel">
            <div className="r-item">
              <span className="tag">Error 404</span>
            </div>

            <div className="r-item">
              <h1 className="h1-404">404</h1>
            </div>

            <div className="r-item">
              <h2 className="h2-404">Page Not Found</h2>
            </div>

            <div className="r-item">
              <p className="p-404">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            <div className="r-item">
              <div className="btns">
                <Link href="/" className="btn-primary">
                  Go Home
                </Link>

                <button
                  className="btn-ghost"
                  onClick={() => window.history.back()}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}