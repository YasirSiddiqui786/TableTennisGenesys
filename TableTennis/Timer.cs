using System;
using System.Threading;
using System.Collections.Generic;
using System.Linq;


namespace TableTennis
{
    public class Timer
    {
       
        static void Main()
        {

            var autoEvent = new AutoResetEvent(false);

            var statusChecker = new StatusChecker();
            var stateTimer = new System.Threading.Timer(statusChecker.ForcedLogout,
                                       autoEvent, 1000, 15000);//wait till 1 sends and then execute after 15 seconds
        }
    }
    public class StatusChecker
    {
        MasterPage mpObj = new MasterPage();
        public void ForcedLogout(Object stateInfo)
        {
            
            AutoResetEvent autoEvent = (AutoResetEvent)stateInfo;
            

            }

        }

    }

